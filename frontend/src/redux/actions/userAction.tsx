import {useDispatch, useSelector} from 'react-redux';
import { doc, getDoc } from '@firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import { storage ,db} from '../../../firebase';
import { View } from 'react-native';

export const handleLoginAction = (res) => {
    return {
      type: 'handleLoginAction',
      payload:res
    }
  }

export const handleLoginNotVerificationEmail = (res) => {
  return {
    type: 'handleLoginNotVerificationEmail',
    payload:res
  }
}

export const setUserUUIDAction=(res)=>{
  return{
    type:'setUserUUIDAction',
    payload:res
  }
}

export const setUserObject=(res)=>{
  return{
    type:'setUserObject',
    payload:res
  }
}

// export const fetchUserObject=async()=>{
//   //const dispatch = useDispatch();
//   const userUUID=useSelector((state)=>state.user.userUUID||"") 
//   console.log('actionf')

//   const refFiresrore = doc(db, `users/${userUUID}`);
//   const appUser = (await getDoc(refFiresrore)).data() ;//appUserがデータベースから取得したオブジェクト
//   getDownloadURL(ref(storage, `users/${userUUID}/mainPicture`)).then((getURI)=>{

//     const data= {
//       id: appUser.id,
//       userName: appUser.userName,
//       faculty:appUser.faculty,
//       department:appUser.department,
//       grade:appUser.grade,
//       profile:appUser.profile,
//       userImage:getURI
//     };
//     console.log('action')
//       console.log(data)
//     //dispatch(setUserObject(data))
//     }).
//     catch((e)=>{
//       console.log(e.message)
//       const data= {
//         id: appUser.id,
//         userName: appUser.userName,
//         faculty:appUser.faculty,
//         department:appUser.department,
//         grade:appUser.grade,
//         profile:appUser.profile,
//       };
//       console.log('action')
//       console.log(data)
//       dispatch(setUserObject(data))
//     })
//     return(<View></View>)
//}