import {Slider, Switch} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";

const SineWaveCanvas = () => {
	const canvasRef = useRef(null);

	const canvasHeight = 400;
	const [amplitude, setAmplitude] = useState(50);
	const [omega, setOmega] = useState(50);
	const [angle, setAngle] = useState(0);
	const [animate, setAnimate] = useState(true);

	const amplitudeRef = useRef(amplitude);
	const omegaRef = useRef(omega);
	const angleRef = useRef(angle);
	const counter = useRef(0);
	const requestRef = useRef(null);

	// Synchronize refs with state
	useEffect(() => {
		amplitudeRef.current = amplitude;
		omegaRef.current = omega;
		angleRef.current = angle;
	}, [amplitude, omega, angle]);

	const drawWave = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		// Set canvas resolution for sharp rendering
		const devicePixelRatio = window.devicePixelRatio || 1;
		canvas.style.width = "100%";
		canvas.style.height = `${canvasHeight}px`;
		canvas.width = canvas.offsetWidth * devicePixelRatio;
		canvas.height = canvasHeight * devicePixelRatio;

		ctx.scale(devicePixelRatio, devicePixelRatio);

		// Clear the canvas
		ctx.clearRect(0, 0, canvas.offsetWidth, canvasHeight);

		// Draw axes
		ctx.beginPath();
		ctx.moveTo(0, canvasHeight / 2);
		ctx.lineTo(canvas.offsetWidth, canvasHeight / 2);
		ctx.strokeStyle = "black";
		ctx.stroke();

		// Draw sine wave
		ctx.beginPath();
		const offsetX = canvas.offsetWidth / 2;
		const offsetY = canvasHeight / 2;

		for (let x = 0; x < canvas.offsetWidth; x++) {
			const y =
				(((amplitudeRef.current / 100) * (canvasHeight - 20)) / 2) *
					Math.sin((omegaRef.current / 1000) * (x - offsetX) - counter.current / 50) +
				offsetY;
			ctx.lineTo(x, y);
		}
		ctx.strokeStyle = "blue";
		ctx.lineWidth = 2;
		ctx.stroke();

		// Draw phase-shifted wave if angle is not zero
		if (angleRef.current !== 0) {
			ctx.beginPath();
			for (let x = 0; x < canvas.offsetWidth; x++) {
				const y =
					(((amplitudeRef.current / 100) * (canvasHeight - 20)) / 2) *
						Math.sin((omegaRef.current / 1000) * (x - offsetX) + angleRef.current - counter.current / 50) +
					offsetY;
				ctx.lineTo(x, y);
			}
			ctx.strokeStyle = "gray";
			ctx.lineWidth = 1.5;
			ctx.stroke();
		}

		counter.current++;
	};

	// Animation loop
	useEffect(() => {
		const animateWave = () => {
			drawWave();
			requestRef.current = requestAnimationFrame(animateWave);
		};

		if (animate) {
			animateWave();
		} else {
			cancelAnimationFrame(requestRef.current);
		}

		// Cleanup
		return () => cancelAnimationFrame(requestRef.current);
	}, [animate]);

	return (
		<>
			<div style={{width: "50%"}}>
				<p>Amplitude (A)</p>
				<Slider
					defaultValue={amplitude}
					min={0}
					max={100}
					value={amplitude}
					onChange={(_, val) => setAmplitude(val)}
				/>
				<p>Frequency (ω)</p>
				<Slider defaultValue={omega} min={0} max={100} value={omega} onChange={(_, val) => setOmega(val)} />
				<p>Phase Shift (f)</p>
				<Slider defaultValue={angle} min={0} max={360} value={angle} onChange={(_, val) => setAngle(val)} />
				<p>Animate</p>
				<Switch checked={animate} onChange={(_, val) => setAnimate(val)} />
			</div>
			<canvas ref={canvasRef} height={canvasHeight} style={{border: "1px solid black", width: "100%"}} />
		</>
	);
};

export default SineWaveCanvas;
