import { firebaseApp } from './firebase';

//export const uid = firebaseApp.auth().currentUser.uid;
//export const uid = 'TcZ7Nu2pizZYtmKSq13EiYTknfB2';

/** export const DiaChiRef = firebaseApp.database().ref('DiaChi').child(uid);
export const GioHangRef = firebaseApp.database().ref('GioHang').child(uid);
export const DonHangRef = firebaseApp.database().ref('DonHang').child(uid);
export const ProductRef = firebaseApp.database().ref('Product');
export const ThongBaoRef = firebaseApp.database().ref('ThongBao');
*/
export function formatNumber(soTien) {
    var nb = soTien + "";
    var result = nb.replace(/(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/mg, '$1$2.');
    return result;
}