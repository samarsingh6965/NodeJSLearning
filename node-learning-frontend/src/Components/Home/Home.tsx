import { useContext, type FC, useState, useEffect } from 'react';
import MyContext from '../../Context/DataContext';
import { responseType, taskType } from '../Common/Interfaces';
import http from '../../Services/http';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const { isRender, setIsRender } = useContext(MyContext);
    const [taskdata, setTaskData] = useState<taskType[] | null>(null)
    const navigate = useNavigate();
    const fetchTAsks = async () => {
        try {
            const response: responseType = await http({
                url: `/api/gettasks`,
                method: 'get',
            }, false);
            if (response.data?.code === 'SUCCESS_200') {
                setTaskData(response?.data?.data)
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: any | unknown) {
            toast.error((error as any)?.response?.data?.message);
        }
    }
    const handleDeleteTask = async (id: any) => {
        const confirm = window.confirm('Are you sure to delete this task');
        if(confirm){
            try {
                const response: responseType = await http({
                    url: `/api/deletetask`,
                    method: 'delete',
                    data: { id: id }
                }, false);
                if (response.data?.code === 'SUCCESS_200') {
                    toast.success(response.data?.message)
                    setIsRender(!isRender)
                } else {
                    toast.error(response?.data?.message)
                }
            } catch (error: any | unknown) {
                toast.error((error as any)?.response?.data?.message);
            }
        }
    }
    useEffect(() => {
        fetchTAsks()
    }, [isRender]);
    return (
        <div className="bg-gray-100 h-full gap-x-2 p-2 w-full grid grid-rows-5 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 overflow-y-scroll">
            {taskdata?.map((task: any) => (
                <div key={task?._id} className="bg-white min-h-[150px] max-h-[150px] shadow-md rounded-lg">
                    <div className="p-4">
                        <h2 className="text-gray-800 text-lg font-semibold mb-2">{task?.title}</h2>
                        <p className="text-gray-600 truncate">{task?.description}</p>
                        <div className="mt-4 flex space-x-2">
                            <button onClick={() => navigate(`/editCard/${task?._id}`)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">
                                Edit
                            </button>
                            <button onClick={() => handleDeleteTask(task?._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}
export default Home;