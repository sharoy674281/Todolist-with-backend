import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
   title: { type: String, required: true }, // Tittel er obligatorisk
   description: { type: String }, // Valgfri beskrivelse
   completed: { type: Boolean, default: false }, // Standard er "ikke fullført"
   dueDate: { type: Date }, // Valgfri forfallsdato
   createdAt: { type: Date, default: Date.now }, // Opprettes automatisk
});

const Task = mongoose.model("Task", taskSchema); // Oppretter en modell basert på skjemaet

export default Task