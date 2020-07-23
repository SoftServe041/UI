import React, { useEffect, useState, useRef } from 'react';
import {
  Canvas,
  useFrame,
  extend,
  useThree,
} from "react-three-fiber";
import Compartment from './Compartment.js';
import Box from './Box.js';
import Plane from './Plane.js';
import SidePanel from './SidePanel.js';
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as THREE from 'three'
import axios from 'axios';

// Calling extend with the native OrbitControls class from Three.js
// will make orbitControls available as a native JSX element.
// Notice how the OrbitControls classname becomes lowercase orbitControls when used as JSX element.
extend({ OrbitControls });

function Cargo3D(props) {
  // let setIfShowModalError = props.setIfShowModalError;
  // let setErrorMessage = props.setErrorMessage;
  const [data, setData] = useState([]);
  const [showFlag, setShowFlag] = useState(props.showFlag);

  // Initialize zero for coordinates
  const zeroWidth = -4;
  const zeroHeight = -4;
  const zeroDepth = -20;

  const [flag, setFlag] = useState(true);

  function getBoxesDataForVisualisation() {
    axios({
      'method': 'GET',
      'url': "http://localhost:9041/admin/hub/cargosByTransporter?id=" + props.truckId,
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer_${props.token}`,
      },
    }).then(response => {
      if (response.status === 200) {
        setData(response.data);
      }

    }).catch((error) => {
      // setIfShowModalError(true);
      // setErrorMessage(error.response.data.message);
      setData([
        {
          width: 1.2,
          length: 1.2,
          height: 1.2,
          widthPos: 0,
          heightPos: 0,
          lengthPos: 0,
        },
        {
          width: 0.9,
          length: 0.9,
          height: 0.9,
          widthPos: 4,
          heightPos: 4,
          lengthPos: 4,
        },
        {
          width: 2.4,
          length: 1.2,
          height: 1.2,
          widthPos: 0,
          heightPos: 0,
          lengthPos: 4,
        }
      ]);
    });
  }

  useEffect(() => {
    if (flag) {
      getBoxesDataForVisualisation();
      setFlag(false);
    }
  });

  return (
    <div>
      <Modal style={{ width: '800px', height: '600px', backgroundColor: "#2d2929" }} show={showFlag} onHide={() => setShowFlag(false)} animation='true' aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <Modal.Title className="font-weight-bold ml-3">
            <h4 style={{ color: 'darkorange' }}>Compartment Visualization</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className='mt-1 mr-7 ml-7 pt-1 pb-1'>
              <Col>
                <Canvas shadowMap style={{ width: '800px', height: '600px' }} camera={{ fov: 75, position: [30, 30, 30] }} onCreated={({ gl }) => {
                  gl.toneMapping = THREE.ACESFilmicToneMapping
                  gl.outputEncoding = THREE.sRGBEncoding
                }}>
                  <CameraControls />
                  <pointLight position={[0, 10, 0]} intensity={0.3} />
                  <spotLight intensity={0.75} position={[-15, 30, 20]} angle={2.0} penumbra={1} castShadow />
                  <spotLight intensity={0.25} position={[15, 30, -20]} angle={1.5} penumbra={1} castShadow />
                  <spotLight intensity={0.2} position={[-30, 20, 0]} angle={1.5} penumbra={1} castShadow />
                  <Plane zPos={-4} xPos={0} yPos={0} xAxis={-1.57} zAxis={0} yAxis={0} />
                  <SidePanel zPos={95} xPos={0} yPos={-99} xAxis={0} zAxis={0} yAxis={0} />
                  <SidePanel zPos={95} xPos={0} yPos={99} xAxis={0} zAxis={0} yAxis={9.425} />
                  <SidePanel zPos={95} xPos={-99} yPos={0} xAxis={0} zAxis={0} yAxis={1.57} />
                  <SidePanel zPos={95} xPos={99} yPos={0} xAxis={0} zAxis={0} yAxis={-1.57} />
                  <Compartment position={[0, 0, 0]} depth={40} height={8} width={8} />
                  {
                    data.map(box => {
                      return <Box position={[zeroDepth + box.lengthPos + (box.length / 0.6), zeroHeight + box.heightPos + (box.height / 0.6), zeroWidth + box.widthPos + (box.width / 0.6)]} depth={box.length / 0.3} height={box.height / 0.3} width={box.width / 0.3} />
                    })
                  }
                </Canvas>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d2929" }}>
          <Button style={{ minWidth: "150px", backgroundColor: "#ff8e09" }} className='col-md-5 mr-4' onClick={() => { props.handleModal() }}> Close </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(state => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      maxAzimuthAngle={Math.PI}
      maxPolarAngle={Math.PI / 2}
      minAzimuthAngle={-Math.PI}
      minPolarAngle={0}
    />
  );
};

export default Cargo3D