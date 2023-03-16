import minifaker from 'minifaker'
import 'minifaker/locales/en'
import Image from 'next/image';
import { useEffect, useState } from 'react'

type SuggestionType = {
    id: number;
    username: string;
    jobTitle: string;
    profile: string;
}

export default function Suggestions() {
    const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
    useEffect(() => {
        const suggests = minifaker.array(5, i => ({
            id: i,
            username: minifaker.username().toLowerCase(),
            jobTitle: minifaker.jobTitle(),
            profile: `https://i.pravatar.cc/150?u=${minifaker.nanoId.nanoid()}`,
        }))
        setSuggestions(suggests)
    }, [])
    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between
                            mb-5 text-sm">
                <h3 className="font-bold text-gray-400">
                    Suggestion for you</h3>
                <button className="text-gray-600 font-semibold">
                    See all
                </button>
            </div>
            {suggestions.map(suggest => (
                <div className="flex items-center 
                                justify-between mt-3"
                    key={suggest.id}>
                    <Image src={suggest.profile}
                        alt={suggest.username}
                        draggable={false}
                        className="h-10 w-10 border p-[2px]
                                        rounded-full"
                        height={60} width={60} />
                    <div className='flex-1 ml-4'>
                        <h2 className='font-semibold text-sm'>
                            {suggest.username}
                        </h2>
                        <h3 className='font-bold truncate 
                        text-sm text-gray-400
                        w-[230px]'>
                            {suggest.jobTitle}
                        </h3>
                    </div>
                    <button className='font-semibold 
                        text-blue-400 text-sm'>
                        Follow
                    </button>
                </div>
            ))}

        </div>
    )
}
