import { useRouter } from 'next/router'

function NavItem({ to, Content, active}) {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(to) }
            className={ active ? 
                "flex w-14 md:w-56 justify-center items-center py-3 bg-opacity-100 transition duration-150 cursor-pointer backdrop-blur-md bg-black hover:bg-white hover:text-black rounded-lg" 
                : 
                "flex w-14 md:w-56 justify-center items-center py-3 bg-opacity-0 transition duration-150 cursor-pointer backdrop-blur-md bg-black hover:bg-white hover:text-black rounded-lg"
            }
        >
            <Content/>
        </div>
    )
}

export default NavItem