export default function Banner({ message, url = '#' }: any) {
    return (
        <div className="fixed inset-x-0 bottom-0 pointer-events-none sm:flex sm:justify-center sm:px-6 lg:pb-5 lg:px-8">
            <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 px-6 py-2.5 sm:rounded-xl sm:py">

            </div>
        </div>
    )
}