import Image from 'next/image'
import Link from 'next/link'

export const Userintrest: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 p-4 px-7 ml-10">
      {/* <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
          SS
        </div>
      </div> */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back, Siddhartha</h1>
        <Link
          href="/newuser"
          className="text-purple-600 hover:text-purple-800 hover:underline"
        >
          Add your interests
        </Link>
      </div>
    </div>
  )
}