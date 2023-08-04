import type { FC } from 'react';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    return (
        <div className="bg-gray-100 h-full gap-2 p-2 w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 overflow-y-scroll">
            <div className="max-w-md bg-white min-h-[150px] max-h-[150px] shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <h2 className="text-gray-800 text-lg font-semibold mb-2">Card Title</h2>
                    <p className="text-gray-600 truncate">Description of the card goes here.Description of the card goes here.</p>
                    <div className="mt-4 flex space-x-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">
                            Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;