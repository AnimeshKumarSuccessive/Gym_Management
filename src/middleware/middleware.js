const Authrization = (...roles) => {
  console.log('roles', roles[0].body.role);
  return (req,res,next) => {
    console.log(req);
    if(!roles[0].body.role==='Admin') {
     console.log("you don't have permission");
    }
    next();
    if(!roles[0].body.role==='Admin') {
      console.log("you don't have permission");
     }
     next();
  }
}

export default Authrization;
