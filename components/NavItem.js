import { useRouter } from 'next/router'

function NavItem({ to, Content, active}) {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(to) }
            className={ active ? 
                "flex items-center space-x-2 p-3 px-4 md:px-24 md:py-4 bg-opacity-100 transition duration-150 cursor-pointer backdrop-blur-md bg-black hover:bg-white hover:text-black rounded-r-2xl" 
                : 
                "flex items-center space-x-2 p-3 px-4 md:px-24 md:py-4 bg-opacity-30 transition duration-150 cursor-pointer backdrop-blur-md bg-black hover:bg-white hover:text-black rounded-r-2xl"
            }
        >
            <Content/>
        </div>
    )
}

export default NavItem