import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;
import android.util.Log;
import android.provider.Settings;
import android.widget.Toast;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.opticalphusion.android.hedc.HEDCUsbCom;

public class HedcPlugin extends CordovaPlugin implements HEDCUsbCom.OnConnectionStateListener,
        HEDCUsbCom.OnBarcodeListener {

    public static final String TAG = HedcPlugin.class.getSimpleName();

    private HEDCUsbCom m_engine;

    private byte[] m_outputbuf;
    private int[] m_nBytesReturned;

    private CallbackContext cbContext;

    private String[] AsciiTab = {
            "NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL", "BS", "HT", "LF", "VT",
            "FF", "CR", "SO", "SI", "DLE", "DC1", "DC2", "DC3", "DC4", "NAK", "SYN", "ETB",
            "CAN", "EM", "SUB", "ESC", "FS", "GS", "RS", "US", "SP", "DEL",
    };

    public HedcPlugin() {}

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Log.d(TAG,"Init HedcPlugin");

        m_engine = new HEDCUsbCom(cordova.getActivity().getApplicationContext(), this, this);

        m_outputbuf = new byte[512];
        m_nBytesReturned = new int[1];

        String version;
        short v = m_engine.GetLibraryVersion(m_outputbuf, 512, m_nBytesReturned);
        version = ConvertToString(m_outputbuf, m_nBytesReturned[0]);
        Log.d(TAG, "Library version: " + version);
    }

    public boolean execute(final String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                PluginResult pluginResult = new PluginResult(PluginResult.Status.NO_RESULT); 
                pluginResult.setKeepCallback(true);

                cbContext = callbackContext;        
                cbContext.sendPluginResult(pluginResult);

                sendMenuCommand(action);
            }
        });

        return true;
    }

    @Override
    public void OnConnectionStateEvent(HEDCUsbCom.ConnectionState connectionState) {

        if (connectionState == HEDCUsbCom.ConnectionState.Connected) {
            Log.d(TAG, "Connected");
        } else {
            Log.d(TAG, "Not Connected");
        }
    }

    @Override
    public void OnBarcodeData(final byte[] bytes, final int length) {
       String barcodeData = ConvertToString(bytes, length);
       Log.d(TAG, "BarcodeData: " + barcodeData);

       PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, barcodeData);
       pluginResult.setKeepCallback(true); 
       cbContext.sendPluginResult(pluginResult);
    }  

    private String ConvertToString(byte[] data, int length) {
        String s;

        StringBuilder s_final = new StringBuilder();

        for (int i = 0; i < length; i++) {
            if ((data[i] >= 0) && (data[i] < 0x20)) {
                s = String.format("<%s>", AsciiTab[data[i]]);
            } else if (data[i] >= 0x7F) {
                s = String.format("<0x%02X>", data[i]);
            } else {
                s = String.format("%c", data[i] & 0xFF);
            }
            s_final.append(s);
        }

        return s_final.toString();
    }

    private void sendMenuCommand(String cmd) {
        Log.d(TAG,"Send Menu Command:"+ cmd);

        byte Header[] = cmd.toUpperCase().getBytes();

        m_outputbuf = new byte[512];
        m_nBytesReturned = new int[1];

        m_engine.SendWrappedCommand(Header, Header.length, m_outputbuf, 512, m_nBytesReturned, 1000);

        if (m_nBytesReturned[0] > 0) {
            String data = ConvertToString(m_outputbuf, m_nBytesReturned[0]);
            Log.d(TAG, data);
        }
    }
    
}