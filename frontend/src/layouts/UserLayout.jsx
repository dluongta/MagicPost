import photo from "../assets/dinosaur.png";

export default function UserLayout({ user, onlineUsersId, isRead }) {
    return (
        <div className="relative flex items-center">
            <img className="w-10 h-10 rounded-full" src={photo} alt="" />
            <span className={`block ml-2 ${isRead ? 'text-gray-500 dark:text-gray-400' : 'font-bold text-gray-900 dark:text-gray-100'}`}>
                {user?.email}
            </span>
            {onlineUsersId?.includes(user?._id) ? (
                <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-500 dark:bg-green-400 border-2 border-white rounded-full"></span>
            ) : (
                <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></span>
            )}
        </div>
    );
}
