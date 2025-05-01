import { deleteRemainder } from "../services/api"

const handleDelete = async (userId,taskId,fetchRemainders)=>{
    await deleteRemainder(userId,taskId);
    fetchRemainders();
}

export default handleDelete;