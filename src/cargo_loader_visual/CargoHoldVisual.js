import React, { useEffect, useState, Suspense, useRef } from 'react';
import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree,
} from "react-three-fiber";
import Compartment from './Compartment.js';
import Box from './Box.js';
import Plane from './Plane.js';
import SidePanel from './SidePanel.js';
import { Pagination, Table, Dropdown, DropdownButton, Button, Form, Modal, Row, Col, Container } from "react-bootstrap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as THREE from 'three'

// Calling extend with the native OrbitControls class from Three.js
// will make orbitControls available as a native JSX element.
// Notice how the OrbitControls classname becomes lowercase orbitControls when used as JSX element.
extend({ OrbitControls });

function Cargo3D(props) {

  // Initialize zero for coordinates
  const zeroWidth = -4;
  const zeroHeight = -4;
  const zeroDepth = -20;

  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (flag) {
      setFlag(false);
    }
  });

  // Метод формирования боксов входные параметры брать из админа из базы, получает массив, возвращает массив коробок
  return (
    <div>
      <Modal style={{ width: '800px', height: '600px', backgroundColor: "#2d2929" }} show={props.showFlag} onHide={() => { }} animation='true' aria-labelledby="contained-modal-title-vcenter"
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

                  <Box position={[zeroDepth + 0 + 2, zeroHeight + 0 + 2, zeroWidth + 0 + 2]} depth={4} height={4} width={4} />
                  <Box position={[zeroDepth + 0 + 2, zeroHeight + 4 + 2, zeroWidth + 0 + 2]} depth={4} height={4} width={4} />
                  <Box position={[zeroDepth + 0 + 2, zeroHeight + 0 + 1, zeroWidth + 4 + 1]} depth={4} height={2} width={2} />
                  <Box position={[zeroDepth + 0 + 2, zeroHeight + 2 + 1, zeroWidth + 4 + 1]} depth={4} height={2} width={2} />
                  <Box position={[zeroDepth + 0 + 2, zeroHeight + 0 + 1, zeroWidth + 6 + 1]} depth={4} height={2} width={2} />
                  <Box position={[zeroDepth + 0 + 2, zeroHeight + 2 + 1, zeroWidth + 6 + 1]} depth={4} height={2} width={2} />
                  <Box position={[zeroDepth + 0 + 2, zeroHeight + 4 + 2, zeroWidth + 5 + 1]} depth={4} height={4} width={2} />
                  <Box position={[zeroDepth + 0 + 1, zeroHeight + 4 + 0.5, zeroWidth + 4 + 0.5]} depth={2} height={1} width={1} />
                  <Box position={[zeroDepth + 4 + 2, zeroHeight + 0 + 2, zeroWidth + 0 + 2]} depth={4} height={4} width={4} />
                  <Box position={[zeroDepth + 4 + 2, zeroHeight + 4 + 2, zeroWidth + 4 + 2]} depth={4} height={4} width={4} />
                  <Box position={[zeroDepth + 4 + 2, zeroHeight + 0 + 2, zeroWidth + 4 + 2]} depth={4} height={4} width={4} />
                  <Box position={[zeroDepth + 4 + 2, zeroHeight + 4 + 2, zeroWidth + 0 + 2]} depth={4} height={4} width={4} />
                  <Box position={[zeroDepth + 8 + 2, zeroHeight + 0 + 2, zeroWidth + 2 + 2]} depth={4} height={4} width={4} />
                  <Box position={[zeroDepth + 8 + 2, zeroHeight + 0 + 2, zeroWidth + 0 + 1]} depth={4} height={4} width={2} />
                  <Box position={[zeroDepth + 8 + 2, zeroHeight + 4 + 1, zeroWidth + 0 + 1]} depth={4} height={2} width={2} />
                  <Box position={[zeroDepth + 8 + 2, zeroHeight + 6 + 1, zeroWidth + 0 + 1]} depth={4} height={2} width={2} />
                  <Box position={[zeroDepth + 12 + 4, zeroHeight + 0 + 1, zeroWidth + 0 + 2]} depth={8} height={2} width={4} />
                  <Box position={[zeroDepth + 12 + 1, zeroHeight + 2 + 1, zeroWidth + 0 + 1]} depth={2} height={2} width={2} />
                  {/* Box position={[zeroDepth + box.getDepthPos() + box.getDepthInCells() / 2]} */}
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
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

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