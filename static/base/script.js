(function(){
  function createFace(canvas, mood){
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.4, 3.5);

    function resize(){
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    const amb = new THREE.AmbientLight(0xffffff, 0.7);
    const dir = new THREE.DirectionalLight(0xffffff, 0.7);
    dir.position.set(2, 3, 4);
    scene.add(amb, dir);

    const headGeo = new THREE.SphereGeometry(1, 48, 48);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffe0b3, roughness:0.6, metalness:0.1 });
    const head = new THREE.Mesh(headGeo, headMat);
    scene.add(head);

    const nose = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0xffc58f })
    );
    nose.position.set(0, 0, 0.98);
    scene.add(nose);

    const eyes = new THREE.Group();
    const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    function makeEye(x){
      const g = new THREE.Group();
      const globe = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), eyeWhiteMat);
      globe.position.z = 0.85;
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.09, 18, 18), pupilMat);
      pupil.position.set(0, 0, 0.99);
      g.add(globe, pupil);
      g.position.x = x;
      g.position.y = 0.3;
      return g;
    }
    eyes.add(makeEye(-0.45), makeEye(0.45));
    scene.add(eyes);

    const brows = new THREE.Group();
    const browMat = new THREE.MeshStandardMaterial({ color: 0x3a2c1a });
    function makeBrow(x, tilt){
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.05), browMat);
      brow.position.set(x, 0.75, 0.75);
      brow.rotation.z = tilt;
      return brow;
    }
    brows.add(makeBrow(-0.45, 0.25), makeBrow(0.45, -0.25));
    scene.add(brows);

    const mouthGroup = new THREE.Group();
    scene.add(mouthGroup);
    const mouthMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    function makeSmile(radius=0.55, thickness=0.08, y=-0.25, invert=false){
      const torus = new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, 16, 64, Math.PI),
                    mouthMat);
      torus.rotation.x = Math.PI/2;
      torus.rotation.z = invert ? Math.PI : 0;
      torus.position.y = y;
      torus.position.z = 0.85;
      return torus;
    }

    // Mood adjustments
    switch(mood){
      case 'happy':
        mouthGroup.add(makeSmile());
        break;
      case 'sad':
        mouthGroup.add(makeSmile(0.5, 0.07, -0.15, true));
        break;
      case 'crying':
        mouthGroup.add(makeSmile(0.48, 0.07, -0.18, true));
        break;
      case 'pain':
        mouthGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.3, 0.05), mouthMat));
        break;
    }

    let t = 0;
    function animate(){
      t += 0.01;
      head.rotation.y = Math.sin(t*0.7)*0.12;
      head.rotation.x = Math.sin(t*0.5)*0.06;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }
  const faces = [
    { id: 'face-happy',  mood: 'happy'  },
    { id: 'face-sad',    mood: 'sad'    },
    { id: 'face-crying', mood: 'crying' },
    { id: 'face-pain',   mood: 'pain'   },
  ];
  faces.forEach(f=>{
    const canvas = document.getElementById(f.id);
    if(canvas) createFace(canvas, f.mood);
  });
  const slider = document.getElementById('emotionSlider');
  const slides = slider.querySelectorAll('li');
  let index = 0;

  function updateSlider(){
    slides.forEach((li, i)=>{
      li.className = "inactive";
      if(i === index) li.className = "active";
      if(i === index - 1) li.className = "prev";
      if(i === index + 1) li.className = "next";
    });
  }

  document.getElementById('nextBtn').addEventListener('click', ()=>{
    if(index < slides.length - 1){
      index++;
      updateSlider();
    }
  });
  document.getElementById('prevBtn').addEventListener('click', ()=>{
    if(index > 0){
      index--;
      updateSlider();
    }
  });

  updateSlider(); 
})();