import React from "react";

const header = () => {
	return (
		<header className="bg-gray-100 h-16 px-4 flex items-center justify-between">
			<h1 className="text-xl font-bold">My App</h1>
			<nav className="flex space-x-4">
				<a href="#" className="px-3 py-2 text-gray-500 hover:text-gray-700">
					Home
				</a>
				<a href="#" className="px-3 py-2 text-gray-500 hover:text-gray-700">
					About
				</a>
				<a href="#" className="px-3 py-2 text-gray-500 hover:text-gray-700">
					Contact
				</a>
			</nav>
		</header>
	);
};

export default header;
