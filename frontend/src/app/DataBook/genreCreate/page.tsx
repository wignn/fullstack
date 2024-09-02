"use client";

import {saveBook} from "@/lib/actions";
import {useFormState} from "react-dom";
import {SubmitButton} from "@/app/components/Book/buttons";
import {saveGenre} from "./actionGenre";
import Navbar from "@/app/components/NavbarComponents";

const CreateBookForm = () => {
    const [state, formAction] = useFormState(saveGenre, null);


    return (
        <div>
            <Navbar/>
            <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Genre</h1>
                    <form action={formAction} className="space-y-4">
                        <div>
                            <label htmlFor="genreName" className="block text-sm font-medium text-gray-700">
                                Genre Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <SubmitButton label="Save" className="w-full"/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBookForm;
