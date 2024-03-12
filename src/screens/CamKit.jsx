import React, { useEffect, useState, useRef, useContext } from "react";
import {
  bootstrapCameraKit,
  createMediaStreamSource,
  Transform2D,
} from "@snap/camera-kit";
import { ButtonContainer, CanvasContainer, Container } from "../assets/styles/CamKitElements";
import { AuthContext } from "../utils/context/loginAuthContext";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

let mediaStream;

const CamKit = () => {
  const canvasRef = useRef(null);

  const apiToken =
    "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjkxOTAzNjY2LCJzdWIiOiI3NDAyOTgxZS03N2M0LTQ0M2QtYjk2OS0yY2E3YjUzOWZmMjd-UFJPRFVDVElPTn42M2YwYTQ2Yy1jMmZmLTQxN2UtYTBkMC05YjM2MmM5NGUyZWUifQ.lit2odeqkuEKa5rR2o5e65nSuhk9gFgho95RFCPqAys";
  const lensGroupId = "12ecf305-39f8-4e2e-9cf7-26348a114426";
  const { currentLensIndex, setCurrentLensIndex } = useContext(AuthContext);
  const { lensesLength, setLensesLength } = useContext(AuthContext);
  const { lensesFetch, setLensesFetch } = useContext(AuthContext);
  const { camSession, setCamSession } = useContext(AuthContext);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLensIndex((prevIndex) =>
        prevIndex === lensesLength - 1 ? 0 : prevIndex + 1
      );
      console.log(currentLensIndex);
      console.log(lensesLength);
      console.log(lensesFetch);

      camSession.applyLens(lensesFetch[currentLensIndex]);
    }, 20000); // Change lens every 5 seconds

    return () => clearInterval(intervalId);
  }, [currentLensIndex]); // Run effect only once

  useEffect(() => {
    initCamera(); // Pass currentLensIndex to initCamera
  }, []); // Update effect when currentLensIndex changes

  const initCamera = async (index) => {
    // Receive currentLensIndex as parameter
    const cameraKit = await bootstrapCameraKit({ apiToken });

    const canvas = canvasRef.current;
    const session = await cameraKit.createSession({
      liveRenderTarget: canvas,
    });

    if (canvas) {
      canvas.replaceWith(session.output.live);
    }
    const { lenses } = await cameraKit.lensRepository.loadLensGroups([
      lensGroupId,
    ]);
    await session.applyLens(lenses[0]); // Use index instead of 0
    setLensesLength(lenses.length);
    setLensesFetch(lenses);
    setCurrentLensIndex(0);
    console.log(lenses);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    const source = createMediaStreamSource(stream, {
      transform: Transform2D.MirrorX,
      cameraType: "front",
    });
    await session.setSource(source);
    setCamSession(session);
    await setCameraKitSource(session);
  };

  const setCameraKitSource = async (session, deviceId) => {
    if (mediaStream) {
      session.pause();
      mediaStream.getVideoTracks()[0].stop();
    }

    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId },
    });

    const source = createMediaStreamSource(mediaStream);

    await session.setSource(source);

    source.setTransform(Transform2D.MirrorX);

    session.play();
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
        document.documentElement.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <>
      
      <Container>
        <ButtonContainer>
        {!isFullscreen &&
        <OpenInFullIcon onClick={handleFullscreen} />
        
        }
        {isFullscreen &&

          <CloseFullscreenIcon onClick={handleFullscreen} />
        }

        </ButtonContainer>
        <CanvasContainer ref={canvasRef} id="canvas-container" />
      </Container>
    </>
  );
};

export default CamKit;
