import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { saveRobot } from "../../store/actions/robot.action";
// import { saveTask } from "../../../store/actions/task.action";

export const EditText = ({ robot, onCloseQuickEdit }) => {
    const [fields, handleChange] = useForm({ title: robot.title });
    const dispatch = useDispatch()

    const onSaveTask = (ev) => {
        ev.preventDefault()
        robot.title = fields.title
        dispatch(saveRobot(robot))
        onCloseQuickEdit()
    }

    return (
        <div className="edit-text">
            <form>
                <textarea
                    name="title"
                    value={fields.title}
                    onChange={handleChange}
                    autoFocus
                    onFocus={(e) => e.target.select()}
                >
                </textarea>
                <button onClick={onSaveTask}>Save</button>
            </form>
        </div>
    )
}