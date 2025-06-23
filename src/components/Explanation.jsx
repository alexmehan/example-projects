

export default function Explanation({children}) {

    return (
        <p id="explanation" className="bg-yellow-100 border border-yellow-500 rounded-sm p-6 text-gray-800 mb-6">
            {children}
        </p>
    )
}