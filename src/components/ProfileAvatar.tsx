export default function ProfileAvatar({ name, onClick }:
    { name: string, onClick?: any }) {
    const avatar = name.trim().split(" ")
        .map(c => c.charAt(0))
        .join('').toUpperCase()
    return (
        <div onClick={onClick}
            className="h-10 w-10 rounded-full             
            cursor-pointer flex justify-center 
            items-center text-white bg-purple-300">
            <p>{avatar}</p>
        </div>
    )
}
