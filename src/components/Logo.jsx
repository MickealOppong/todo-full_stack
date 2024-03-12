
const Logo = ({ name }) => {

  function getCharacter(name) {
    return name.charAt(0);
  }
  return <div className="flex items-center justify-center bg-darkcyan w-12 h-12 rounded-3xl ">
    <h4 className="text-white capitalize">{getCharacter(name)}</h4>
  </div>
}


export default Logo;