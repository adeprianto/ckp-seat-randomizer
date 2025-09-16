export default function Seat({name}: { name?: string }) {
    return <div className="text-center">
        <div className="mb-1 lg:text-sm text-xs">{name}</div>
        <div className="flex flex-col items-center ">
            <div className="rounded-sm lg:rounded-lg border border-gray-500 h-4 w-8 lg:h-8 lg:w-12 mb-1"></div>
            <div className="rounded-sm border border-gray-500 h-1 w-4 lg:h-2 lg:w-8"></div>
        </div>
    </div>
}
