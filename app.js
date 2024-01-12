'use strict';

const Homey = require('homey');
const OBSWebSocket = require('obs-websocket-js').default;

class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('OBS Controller has been initialized');
    
    
    
    
    
    const cardChangeScene = this.homey.flow.getActionCard('change-scene');
    
    cardChangeScene.registerRunListener(async (args) => { 
      
      
    const { sceneNameText } = args; // args.sceneNameText
    this.log(`This is the scene new scene: ${sceneNameText}`)
    
    const websocketurl = this.homey.settings.get('obs_websocket_url');
    this.log('Got OBS Websocket URL: ' + websocketurl)
    
    const websocketpass = this.homey.settings.get('obs_websocket_password');
    //this.log('Got OBS Websocket Password: ' + websocketpass)  
    
    
        
    // Define the WebSocket server address and port
    const obs = new OBSWebSocket();

    const address = websocketurl; //const address = 'ws://192.168.XXX.XXX:4455';
    const password = websocketpass; // Enter your OBS password here
    
    // Connect to the WebSocket server
    obs.connect(address, password)
      .then(() => {
        
      const sceneName = args.sceneNameText;
    
      // If the scene name is not null, change the scene
      if (sceneName) {
        changeScene(sceneName);
      }
      })
      .catch(err => {
        console.error(err);
      });
    
    function changeScene(sceneName) {
      // Set the current program scene to the specified scene name
      obs.call('SetCurrentProgramScene', { 'sceneName': sceneName })
        .catch(err => {
            console.error(err);
          })
        .finally(() => obs.disconnect()); // Disconnect from the WebSocket server after the call completes
    }

    
    })
    
    
    
    
    
    
    
    
    const cardChangeSceneAutocomplete = this.homey.flow.getActionCard("change-scene-autocomplete");
    
    cardChangeSceneAutocomplete.registerArgumentAutocompleteListener(
      "sceneNameTextAutocomplete",
      async (query, args) => {
        
        const websocketurl = this.homey.settings.get('obs_websocket_url');
        this.log('Got OBS Websocket URL: ' + websocketurl)
        
        const websocketpass = this.homey.settings.get('obs_websocket_password');
        //this.log('Got OBS Websocket Password: ' + websocketpass)  
    
        const obs = new OBSWebSocket();
        try {
          console.log("Connecting to OBS WebSocket...");
          //await obs.connect({ address: websocketurl, password: websocketpass });
          await obs.connect(websocketurl, websocketpass)
          console.log("Connected to OBS WebSocket");
    
          const data = await obs.call('GetSceneList');
          obs.disconnect();
    
          //const sceneNames = data.scenes.map(scene => ({ name: scene.name }));
          const results = data;
          this.log('Got sceneNames: ' + results)
          console.log(results);
                   
         const sceneNames = results.scenes.map(scene => ({ name: scene.sceneName }));
         
         // Filter based on the query
         const filteredSceneNames = sceneNames.filter(scene => scene.name.toLowerCase().includes(query.toLowerCase()));
         return filteredSceneNames;
          
          
        } catch (err) {
          console.error(err);
          return [];
        }
      }
    );
    
    
    
    cardChangeSceneAutocomplete.registerRunListener(async (args) => {  
      
    const { sceneNameTextAutocomplete } = args; // args.sceneNameText
    this.log(`This is the scene new scene: ${sceneNameTextAutocomplete.name}`)
    
    const websocketurl = this.homey.settings.get('obs_websocket_url');
    this.log('Got OBS Websocket URL: ' + websocketurl)
    
    const websocketpass = this.homey.settings.get('obs_websocket_password');
    //this.log('Got OBS Websocket Password: ' + websocketpass)  
    
        
    // Define the WebSocket server address and port
    const obs = new OBSWebSocket();
    
    const address = websocketurl;
    const password = websocketpass; // Enter your OBS password here
    
    // Connect to the WebSocket server
    obs.connect(address, password)
      .then(() => {
        
      const sceneName = args.sceneNameTextAutocomplete.name;
    
      // If the scene name is not null, change the scene
      if (sceneName) {
        changeScene(sceneName);
      }
      })
      .catch(err => {
        console.error(err);
      });
    
    function changeScene(sceneName) {
      // Set the current program scene to the specified scene name
      obs.call('SetCurrentProgramScene', { 'sceneName': sceneName })
        .catch(err => {
            console.error(err);
          })
        .finally(() => obs.disconnect()); // Disconnect from the WebSocket server after the call completes
    }
    
    
    })
    
    
    
    
    
    
    
    
    
    const cardStopStream = this.homey.flow.getActionCard('stop-stream');
    
    cardStopStream.registerRunListener(async (args) => { 
    
    const websocketurl = this.homey.settings.get('obs_websocket_url');
    this.log('Got OBS Websocket URL: ' + websocketurl)
    
    const websocketpass = this.homey.settings.get('obs_websocket_password');
    //this.log('Got OBS Websocket Password: ' + websocketpass)  
  
        
    // Define the WebSocket server address and port
    const obs = new OBSWebSocket();
    
    const address = websocketurl; //const address = 'ws://192.168.XXX.XXX:4455';
    const password = websocketpass; // Enter your OBS password here
    
    // Connect to the WebSocket server
    obs.connect(address, password)
      .then(() => {
        
      console.log("Stopping stream...");
     
      obs.call('StopStream')
        .catch(err => {
            console.error(err);
          })
        .finally(() => obs.disconnect()); // Disconnect from the WebSocket server after the call completes
       
        console.log("Stream stopped");
        
      })
      .catch(err => {
        console.error(err);
      });
    
    })
    
    
    
    
    
    const cardStartStream = this.homey.flow.getActionCard('start-stream');
    
    cardStartStream.registerRunListener(async (args) => { 
    
    const websocketurl = this.homey.settings.get('obs_websocket_url');
    this.log('Got OBS Websocket URL: ' + websocketurl)
    
    const websocketpass = this.homey.settings.get('obs_websocket_password');
    //this.log('Got OBS Websocket Password: ' + websocketpass)  
    
        
    // Define the WebSocket server address and port
    const obs = new OBSWebSocket();
    
    const address = websocketurl; //const address = 'ws://192.168.XXX.XXX:4455';
    const password = websocketpass; // Enter your OBS password here
    
    // Connect to the WebSocket server
    obs.connect(address, password)
      .then(() => {
        
      console.log("Starting stream...");
     
      obs.call('StartStream')
        .catch(err => {
            console.error(err);
          })
        .finally(() => obs.disconnect()); // Disconnect from the WebSocket server after the call completes
       
        console.log("Stream started");
        
      })
      .catch(err => {
        console.error(err);
      });
    
    })
    
    
    
    
    
    const cardToggleStream = this.homey.flow.getActionCard('toggle-stream');
    
    cardToggleStream.registerRunListener(async (args) => { 
    
    const websocketurl = this.homey.settings.get('obs_websocket_url');
    this.log('Got OBS Websocket URL: ' + websocketurl)
    
    const websocketpass = this.homey.settings.get('obs_websocket_password');
    //this.log('Got OBS Websocket Password: ' + websocketpass)  
    
        
    // Define the WebSocket server address and port
    const obs = new OBSWebSocket();
    
    const address = websocketurl; //const address = 'ws://192.168.XXX.XXX:4455';
    const password = websocketpass; // Enter your OBS password here
    
    // Connect to the WebSocket server
    obs.connect(address, password)
      .then(() => {
        
      console.log("Toggling stream...");
     
      obs.call('ToggleStream')
        .catch(err => {
            console.error(err);
          })
        .finally(() => obs.disconnect()); // Disconnect from the WebSocket server after the call completes
       
        console.log("Stream toggled");
        
      })
      .catch(err => {
        console.error(err);
      });
    
    })    
    
    



    const cardStartRecord = this.homey.flow.getActionCard('start-record');
    
    cardStartRecord.registerRunListener(async (args) => { 
    
    const websocketurl = this.homey.settings.get('obs_websocket_url');
    this.log('Got OBS Websocket URL: ' + websocketurl)
    
    const websocketpass = this.homey.settings.get('obs_websocket_password');
    //this.log('Got OBS Websocket Password: ' + websocketpass)  
    
        
    // Define the WebSocket server address and port
    const obs = new OBSWebSocket();
    
    const address = websocketurl; //const address = 'ws://192.168.XXX.XXX:4455';
    const password = websocketpass; // Enter your OBS password here
    
    // Connect to the WebSocket server
    obs.connect(address, password)
      .then(() => {
        
      console.log("Starting recording...");
     
      obs.call('StartRecord')
        .catch(err => {
            console.error(err);
          })
        .finally(() => obs.disconnect()); // Disconnect from the WebSocket server after the call completes
       
        console.log("Recording started");
        
      })
      .catch(err => {
        console.error(err);
      });
    
    })



    const cardStopRecord = this.homey.flow.getActionCard('stop-record');
    
    cardStopRecord.registerRunListener(async (args) => { 
    
    const websocketurl = this.homey.settings.get('obs_websocket_url');
    this.log('Got OBS Websocket URL: ' + websocketurl)
    
    const websocketpass = this.homey.settings.get('obs_websocket_password');
    //this.log('Got OBS Websocket Password: ' + websocketpass)  
    
        
    // Define the WebSocket server address and port
    const obs = new OBSWebSocket();
    
    const address = websocketurl; //const address = 'ws://192.168.XXX.XXX:4455';
    const password = websocketpass; // Enter your OBS password here
    
    // Connect to the WebSocket server
    obs.connect(address, password)
      .then(() => {
        
      console.log("Stopping recording...");
     
      obs.call('StopRecord')
        .catch(err => {
            console.error(err);
          })
        .finally(() => obs.disconnect()); // Disconnect from the WebSocket server after the call completes
       
        console.log("Recording stopped");
        
      })
      .catch(err => {
        console.error(err);
      });
    
    })




    const cardToggleRecord = this.homey.flow.getActionCard('toggle-record');
    
    cardToggleRecord.registerRunListener(async (args) => { 
    
    const websocketurl = this.homey.settings.get('obs_websocket_url');
    this.log('Got OBS Websocket URL: ' + websocketurl)
    
    const websocketpass = this.homey.settings.get('obs_websocket_password');
    //this.log('Got OBS Websocket Password: ' + websocketpass)  
    
        
    // Define the WebSocket server address and port
    const obs = new OBSWebSocket();
    
    const address = websocketurl; //const address = 'ws://192.168.XXX.XXX:4455';
    const password = websocketpass; // Enter your OBS password here
    
    // Connect to the WebSocket server
    obs.connect(address, password)
      .then(() => {
        
      console.log("Toggle recording...");
     
      obs.call('ToggleRecord')
        .catch(err => {
            console.error(err);
          })
        .finally(() => obs.disconnect()); // Disconnect from the WebSocket server after the call completes
       
        console.log("Recording toggled");
        
      })
      .catch(err => {
        console.error(err);
      });
    
    })
    











 const cardTriggerHotkeyAutocomplete = this.homey.flow.getActionCard("trigger-hotkey-autocomplete");
    
    cardTriggerHotkeyAutocomplete.registerArgumentAutocompleteListener(
      "hotkeyNameTextAutocomplete",
      async (query, args) => {
        
        const websocketurl = this.homey.settings.get('obs_websocket_url');
        this.log('Got OBS Websocket URL: ' + websocketurl)
        
        const websocketpass = this.homey.settings.get('obs_websocket_password');
        //this.log('Got OBS Websocket Password: ' + websocketpass)  
    
        const obs = new OBSWebSocket();
        try {
          console.log("Connecting to OBS WebSocket...");
          //await obs.connect({ address: websocketurl, password: websocketpass });
          await obs.connect(websocketurl, websocketpass)
          console.log("Connected to OBS WebSocket");
    
          const data = await obs.call('GetHotkeyList');
          obs.disconnect();
    
          //const sceneNames = data.scenes.map(scene => ({ name: scene.name }));
          const results = data;
          this.log('Got hotkeys: ' + results)
          console.log(results);
                   
         //const hotkeyNames = results.hotkeys.map(hotkey => ({ name: hotkey.hotkeyName }));
         const hotkeyNames = results.hotkeys.map(hotkey => ({ name: hotkey }));
         console.log(hotkeyNames);
         
         // Filter based on the query
         const filteredHotkeyNames = hotkeyNames.filter(hotkey => hotkey.name.toLowerCase().includes(query.toLowerCase()));
         return filteredHotkeyNames;
          
          
        } catch (err) {
          console.error(err);
          return [];
        }
      }
    );
    
    
    
    cardTriggerHotkeyAutocomplete.registerRunListener(async (args) => {  
      
    const { hotkeyNameTextAutocomplete } = args; // args.sceneNameText
    this.log(`Using this hotkey: ${hotkeyNameTextAutocomplete.name}`)
    
    const websocketurl = this.homey.settings.get('obs_websocket_url');
    this.log('Got OBS Websocket URL: ' + websocketurl)
    
    const websocketpass = this.homey.settings.get('obs_websocket_password');
    //this.log('Got OBS Websocket Password: ' + websocketpass)  
    
        
    // Define the WebSocket server address and port
    const obs = new OBSWebSocket();
    
    const address = websocketurl;
    const password = websocketpass; // Enter your OBS password here
    
    // Connect to the WebSocket server
    obs.connect(address, password)
      .then(() => {
        
      const hotkeyName = args.hotkeyNameTextAutocomplete.name;
    
      // If the scene name is not null, change the scene
      if (hotkeyName) {
        changeHotkey(hotkeyName);
      }
      })
      .catch(err => {
        console.error(err);
      });
    
    function changeHotkey(hotkeyName) {
      // Set the current program scene to the specified scene name
      obs.call('TriggerHotkeyByName', { 'hotkeyName': hotkeyName })
        .catch(err => {
            console.error(err);
          })
        .finally(() => obs.disconnect()); // Disconnect from the WebSocket server after the call completes
    }
    
    
    })













    
    
    
  }

}

module.exports = MyApp;
