"use client";
import { useFormState } from "react-dom";
import { updateUser } from '@/lib/actions';
import { SubmitButton } from "../profile/btn";
import { User } from "@prisma/client";


const UpdateProfile = ({ Users }: { Users: User }) => {

  const updateUsers = updateUser.bind(null, Users?.id)
  const [state, formAction] = useFormState( updateUsers, null);
  console.log( Users?.id)

  return (
    <div>
      <form action={formAction}>
        <div className="mb-5 mt-60">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your Name..."
            defaultValue=''
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-900">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Cover Image URL..."
          />
          <div id="coverImage-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500"></p>
          </div>
        </div>
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.message}</p>
        </div>
        <SubmitButton label="Update" />
      </form>
    </div>
  );
};

export default UpdateProfile;
