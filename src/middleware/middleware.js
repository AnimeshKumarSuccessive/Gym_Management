const Authrization = (...roles) => {
  return (req,res,next) => {
    if(!roles.includes('Admin')) {
     console.log("you don't have permission");
    }
    next();
    if(!roles.includes('SuperAdmin')) {
      console.log("you don't have permission");
     }
     next();
  }
}

export default Authrization;
