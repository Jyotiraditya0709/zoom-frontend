import uitoolkit, { CustomizationOptions } from "@zoom/videosdk-ui-toolkit";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import "./App.css";

let joinTime: Date;

function App() {
  let sessionContainer: HTMLDivElement | null = null;
  // set your auth endpoint here
  // a sample is available here: https://github.com/zoom/videosdk-auth-endpoint-sample
  const authEndpoint = "https://zoom-auth-endpoint.onrender.com"; // http://localhost:4000
  const config: CustomizationOptions = {
    videoSDKJWT:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoiTXJCMTd2dHJOZ0g4UnlBM1pjOExsNDk3RERjaWpmVmh2U2JjIiwicm9sZV90eXBlIjoxLCJ0cGMiOiJ0ZXN0aW5nIHpvb20gdmlkZW8gIiwiaWF0IjoxNzUxMTAyNjQwLCJleHAiOjE3NTExMDYyNDB9.kSQ-gyRT3JiVL-NKQIuVKeYCo1RumIfzC0-oPaqImfk",

    sessionName: "test",
    userName: "J M",
    sessionPasscode: "123",

    featuresOptions: {
      preview: {
        enable: true,
      },
      audio: {
        enable: true,
      },
      video: {
        enable: true,
      },

      virtualBackground: {
        enable: true,
        virtualBackgrounds: [
          {
            url: "https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop",
          },
        ],
      },
    },
  };
  const role = 1;

  function getVideoSDKJWT() {
    sessionContainer = document.getElementById(
      "sessionContainer"
    ) as HTMLDivElement;
    document.getElementById("join-flow")!.style.display = "none";
    fetch(authEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionName: config.sessionName,
        role: role,
        videoWebRtcMode: 1,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.signature) {
          console.log(data.signature);
          config.videoSDKJWT = data.signature;
          joinSession();
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function joinSession() {
    console.log(config);
    joinTime = new Date();

    if (sessionContainer) {
      uitoolkit.joinSession(sessionContainer, config);
      sessionContainer && uitoolkit.onSessionClosed(sessionClosed);
      uitoolkit.onSessionDestroyed(sessionDestroyed);
    }
    
  }

  const sessionClosed = () => {
    console.log("session closed");
    document.getElementById("join-flow")!.style.display = "block";
  };

  const sessionDestroyed = () => {
    console.log("session destroyed");
    const leaveTime = new Date();
    const duration = (leaveTime.getTime() - joinTime.getTime())/1000/ 60;

    fetch("http://localhost:4000/track-session", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        sessionName: config.sessionName,
        userId: "user_"+ Math.random().toString(36).substring(2, 7),
        name: config.userName,
        joinedAt: joinTime.toISOString(),
        leftAt:leaveTime.toISOString(),
        durationMinutes: Math.round(duration),
      }),
    });
    uitoolkit.destroy();
  };

  return (
    <div className="App">
      <main>
        <div id="join-flow">
          <h1>Zoom Video SDK Sample React</h1>
          <p>User interface offered by the Video SDK UI Toolkit</p>
          <button onClick={getVideoSDKJWT}>Join Session</button>
        </div>
        <div id="sessionContainer"></div>
      </main>
    </div>
  );
}

export default App;
