import React, { useEffect } from 'react'
import './App.css'

import Dashboard from './layout/dashboard'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard" />} />
				<Route path="/*" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	)
}
