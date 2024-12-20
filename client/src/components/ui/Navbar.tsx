import profileImage from "../../assets/images/profile-pic-image-placeholder.png";

const Navbar = () => {
  return (
    <nav className="border flex justify-between p-2 lg:p-4">
      <h1
        className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-blue-400 to-blue-300 
                   bg-clip-text text-transparent"
      >
        DragForm
      </h1>
      <div>
        <div className="w-8 ">
          <img
            src={profileImage}
            alt="profile-image"
            className="rounded-full cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
