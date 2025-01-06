import { useEffect, useState } from "react";

function App() {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [editingTask, setEditingTask] = useState(null); // Holder styr på hvilken oppgave som redigeres

	// Funksjon for å håndtere skjemaets innsending
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!task) {
			alert("Please add a task");
			return;
		}

		// Hvis vi redigerer en oppgave
		if (editingTask) {
			const updateTask = async () => {
				try {
					const response = await fetch(
						`http://localhost:5000/tasks/${editingTask._id}`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ title: task }),
						}
					);
					const dataJSON = await response.json();
					setTasks((prevTasks) =>
						prevTasks.map((t) =>
							t._id === editingTask._id ? dataJSON.data : t
						)
					);
					setTask("");
					setEditingTask(null);
				} catch (error) {
					console.log(`error updating task: ${error}`);
				}
			};
			updateTask();
			return;
		}

		// Hvis vi legger til en ny oppgave
		const addTask = async () => {
			try {
				const response = await fetch("http://localhost:5000/tasks/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ title: task }),
				});
				const dataJSON = await response.json();
				setTasks([...tasks, dataJSON.data]);
				setTask("");
			} catch (error) {
				console.log(`error fetching: ${error}`);
			}
		};
		addTask();
	};

	// Hente oppgaver fra backend
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:5000/tasks/");
				const dataJSON = await response.json();
				setTasks(dataJSON.data);
			} catch (error) {
				console.log(`error fetching: ${error}`);
			}
		};
		fetchData();
	}, []);

	// Funksjon for å sette oppgave i redigeringsmodus
	const handleEdit = (taskToEdit) => {
		setTask(taskToEdit.title);
		setEditingTask(taskToEdit);
	};

	// Funksjon for å slette en oppgave
	const handleDelete = async (taskId) => {
		try {
			await fetch(`http://localhost:5000/tasks/${taskId}`, {
				method: "DELETE",
			});
			setTasks((prevTasks) =>
				prevTasks.filter((task) => task._id !== taskId)
			);
		} catch (error) {
			console.log(`error deleting task: ${error}`);
		}
	};

	return (
		<div className="flex flex-col items-center gap-20">
			<h1 className="text-5xl mt-10">
				TodoList with React and TypeScript and backend
			</h1>
			<section className="w-1/3 flex flex-col p-10 rounded-md shadow-lg border-2 bg-gray-300">
				<form
					action=""
					className="flex justify-between h-9 gap-4 mb-4"
					onSubmit={handleSubmit}>
					<input
						type="text"
						className="border-2 w-full border-black rounded-md"
						onChange={(e) => {
							setTask(e.target.value);
						}}
						value={task}
					/>
					<button
						type="submit"
						className="border-2 w-48 border-black rounded-md bg-orange-200 font-bold hover:bg-orange-800">
						{editingTask ? "Update Task" : "Add Task"}
					</button>
				</form>
				<div>
					<ul>
						<li>
							{tasks.map((task) => (
								<div
									key={task._id}
									className="flex justify-between items-center">
									<h2 className="text-2xl">{task.title}</h2>
									<div className="flex gap-4">
										<button
											className="bg-blue-800 px-6 rounded-md text-white"
											onClick={() => handleEdit(task)}>
											Edit
										</button>
										<button
											className="bg-red-600 px-6 rounded-md text-white"
											onClick={() => handleDelete(task._id)}>
											Delete
										</button>
									</div>
								</div>
							))}
						</li>
					</ul>
				</div>
			</section>
		</div>
	);
}

export default App;
