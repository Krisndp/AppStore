import React, {Component} from 'react';
import {View, Text,FlatList,Image,TouchableOpacity,TextInput,Alert,ActivityIndicator}from 'react-native';
import { firebaseApp } from './firebase';

class FlatListItem extends Component{

    constructor(){
        super()
        this.state={
            amount:null,
            total:0,
            maxAmount:0
        }
    }
    componentDidMount() {
        this.setState({
            amount: this.props.item.amount,
            total: this.props.item.amount * this.props.item.price
        })
        let uid = firebaseApp.auth().currentUser.uid;
        firebaseApp.database().ref('/Product/' + uid + '/' + this.props.item.id).once('value').then((snapshot) => {
            // var test=""
            // console.log(snapshot)
            var maxAmount=snapshot.val().SoLuong
            this.setState({
                maxAmount:maxAmount
            })
            console.log(maxAmount)



    }
        )}
    render(){

        return(
            <View style={{margin: 5, borderRadius: 3, backgroundColor: 'white'}}>
                <View style={{
                    flexDirection: 'row', padding: 5
                }}>
                    <Image style={{
                        height: 30, width: 30
                    }}
                           source={{uri: this.props.item.avata}}>
                    </Image>
                    <Text style={{
                        fontWeight: 'bold',
                        marginLeft: 5, marginTop: 5
                    }}>
                        {this.props.item.nguoiBan}
                    </Text>

                </View>
                <View style={{height:1, backgroundColor: 'silver'}}>
                </View>

                <View style={{flexDirection: 'row', padding: 5,}}>
                    <Image style={{
                        height: 70, width: 70
                    }}
                           source={{uri: this.props.item.linkOfImage}}>
                    </Image>

                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{marginLeft: 5, flex: 0.9, fontSize:18}}>
                            {this.props.item.name}
                        </Text>

                        <Text style={{ marginLeft: 5, fontWeight: 'bold',fontSize:16}}>
                            Giá: {String(this.props.item.price).replace(/(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/mg, '$1$2.')} VNĐ
                        </Text>
                    </View>

                    <View style={{flex: 0.35,flexDirection:'row', alignItems: 'center'}}>
                        <TouchableOpacity style={{height:25,width:25}} onPress={()=>{
                            if(this.state.amount>1) {

                                this.setState({
                                    amount: this.state.amount - 1,
                                    total:this.state.total-this.props.item.price
                                }, () => this.props.onClickItem(this.props.item, this.state.amount, 'decrease'))

                            }else if(this.state.amount==1){
                                Alert.alert(
                                    'Thông báo',
                                    'Bạn có chắc chắn muốn xóa sản phẩm khỏi đơn hàng!',
                                    [
                                        {
                                            text: 'OK', onPress: () => {
                                                this.props.onClickItem(this.props.item, this.state.amount, 'decrease');
                                                firebaseApp.database().ref('/GioHang/'+this.props.uid).child(`${this.props.item.id}`).remove()
                                                    .then(()=>{
                                                        this.props.deleteItem();
                                                    });
                                            }
                                        },
                                    ],
                                    {cancelable: false}
                                )
                            }
                            else return;
                        }}>
                            <Image style={{ height: 25, width: 25 }} source={{ uri:"https://img.icons8.com/ios/2x/minus.png"}}/>
                        </TouchableOpacity>
                        <TextInput style={{height:37,width:40,borderRadius:20,borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,
                            borderRightWidth:1,fontSize:15,textAlignVertical: 'center'}} textAlign={'center'} defaultValue={String(this.state.amount)} onChangeText={(value)=>{
                                if(((parseInt(value)==value)&&(parseInt(value)>0))||value=="") {

                                        this.setState({
                                            amount: value,
                                            total: value*this.props.item.price
                                        },()=> {this.props.change(this.state.amount,this.props.item.price)})



                                }else{
                                    Alert.alert("Số lượng phải là một số nguyên và lớn hơn 0")
                                    this.setState({
                                        amount:this.props.item.amount
                                    })

                                }
                        }}/>
                        <TouchableOpacity style={{height:25,width:25}} onPress={()=>{
                            if(this.state.amount==this.state.maxAmount){
                                Alert.alert("Số lượng chọn đã vượt quá số lượng hiện có!")
                            }else{
                            this.setState({
                                amount:this.state.amount+1,
                                total:this.state.total+this.props.item.price
                            }, () => this.props.onClickItem(this.props.item, this.state.amount, 'increase'));

                        }}}>
                            <Image style={{ height: 25, width: 25 }} source={{ uri:"https://img.icons8.com/ios/2x/plus.png"}}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{height:1, backgroundColor: 'silver'}}>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.5, }}>
                        <Text style={{
                            margin: 5,
                        }}>
                            Thành tiền
                        </Text>
                    </View>

                    <View style={{flex: 0.5, alignItems: 'flex-end'}}>
                        <Text style={{
                            margin: 5, color: 'red'
                        }}>
                            {String(this.state.total).replace(/(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/mg, '$1$2.')}
                        </Text>
                    </View>

                </View>

                <View style={{height:1, backgroundColor: 'silver'}}>
                </View>


            </View>

        );
    }
}
export  default class Basket extends Component{

    componentWillMount() {
        this.setState({
            uid:firebaseApp.auth().currentUser.uid
        })
       var uid=firebaseApp.auth().currentUser.uid;
       this.listenForItem(uid);

    }
    constructor(){
        super();
        this.state={
            data:null,
            total:0,
            uid:null
        }
    }
   listenForItem(uid){
       // let data=firebaseApp.database().ref('Basket/1');
       // console.warn(data)
       firebaseApp.database().ref('/GioHang/'+uid).once('value').then((snapshot) => {
           this.setState({
               stores: snapshot.val()
           })
           console.warn(this.state.stores)
           let items = [];
           snapshot.forEach((child) => {
               //console.warn(child);
               items.push({
                   id:child.key,
                   name: child.val().TenSP,
                   amount: child.val().SoLuongMua,
                   price: child.val().Gia,
                   linkOfImage: child.val().Link,
                   avata:child.val().AvataNguoiBan,
                   loaiSP:child.val().LoaiSP,
                   nguoiBan:child.val().TenShop
               });
               this.setState({
                   total:this.state.total+child.val().SoLuongMua*child.val().Gia
               })

           })
           // console.warn(items)
           // console.warn(data)
           // this.listenForItems(data)
           this.setState({
               data:items
           })
           //console.warn(this.state.amount)
           console.warn(this.state.data)
       })
   }
    pay(uid){
      for(i=0;i<this.state.data.length;i++){
          var id=this.state.data[i].id;
          firebaseApp.database().ref('/GioHang/'+uid).child(`${id}`).update({
              SoLuongMua:this.state.data[i].amount
          }).then((response)=>{
              this.props.navigation.navigate('MHDonHang')

      }).catch(error=>console.log(error))


      }

    }
    render(){
        if(!this.state.data){
            return (
                <View style={{flex:1,  alignItems: 'center',justifyContent: 'center',}}>
                    <ActivityIndicator
                        animating={true}
                        style={{
                            height: 80}}
                        size="large"
                    />
                    <Text>Loading...</Text>
                </View>

            );
        }
        else return(
            <View style={{flex:1}}>
                <View style={{flex:9, borderBottomWidth:1}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item,index})=>{

                       //console.warn(JSON.stringify(item))
                        return(
                            <FlatListItem item={item} index={index} uid={this.state.uid} onClickItem={(item, amount, type) => {
                                const itemCost = item.price;
                                let {total} = this.state;
                                if(type === 'increase'){
                                    this.state.data[index].amount++;
                                    //console.log(this.state.data[index].amount)
                                    total += itemCost;
                                } else {
                                    this.state.data[index].amount--;
                                    total -= itemCost;
                                }
                                this.setState({
                                    total
                                })
                            }} deleteItem={()=>{
                                this.listenForItem();
                            }} change={(amount,price)=>{
                                console.log(amount)
                                this.setState({
                                    total:amount*price
                                })
                            }}>
                            </FlatListItem>
                        )
                    }}
                />

                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'flex-start', alignItems:'center'}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Tổng số ước tính:</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'flex-start', alignItems:'center'}}>
                        <Text style={{fontSize:18, fontWeight:'bold'}}>{String(this.state.total).replace(/(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/mg, '$1$2.')} VND</Text>
                        <Text>Bao gồm VAT</Text>
                    </View>
                </View>
                <View style={{flex:0.8,backgroundColor:'orange'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>{
                         this.pay(this.state.uid)
                        // this.props.navigation.navigate("UserInfoOrder")
                    }}>
                        <Text style={{fontSize:20}}>
                            Tiến hành thanh toán
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
