function StudioLighting() {
    return (
        <>
            {/* 1. Ambient: Overall base brightness */}
            <ambientLight intensity={0.8} />

            {/* 2. Key Light: Main source of light from the front-top */}
            <directionalLight
                position={[5, 5, 5]}
                intensity={2.5}
                castShadow
            />

            {/* 3. Fill Light: Softens shadows from the other side */}
            <pointLight position={[-5, 2, 2]} intensity={1.5} color="#ffffff" />

            {/* 4. Rim Light: This creates the "Halo" effect on the edges of the 3D model */}
            <spotLight
                position={[0, 10, -10]}
                intensity={4}
                angle={0.3}
                penumbra={1}
            />

            {/* 5. Top Light: Makes the top surfaces (like the iPad screen/PC top) pop */}
            <rectAreaLight
                width={10}
                height={10}
                intensity={3}
                position={[0, 5, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </>
    );
}