import { useSelector } from "react-redux";



const checkPermissions  = (allowedPermissions, userPermissions)=>{

    if (allowedPermissions.length === 0) {
        return true;
      }

    return userPermissions.some(permission =>
        allowedPermissions.includes(permission)
      );

}


const AccessControl = ({userPermissions,allowedPermissions,children,renderNoAccess,}) => {
    
    let perm =  useSelector((state)=>state?.user?.user_permissions)
    
    let userPerm = userPermissions ? userPermissions : perm

    const permitted = checkPermissions(userPerm, allowedPermissions);
  
    if (permitted) {
      return children;
    }
    return renderNoAccess;
  };


  export default AccessControl
