function HeaderIcon({ Icon }) {
  return (
    <div className="flex items-center cursor-pointer px-2 md:px-5 h-12 md:h-14 hover:bg-black hover:bg-opacity-40 rounded-full">
      <Icon className="h-7 text-center mx-auto"/>
    </div> 
  )
}

export default HeaderIcon