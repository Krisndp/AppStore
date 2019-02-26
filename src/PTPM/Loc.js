import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, Dimensions, ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window');
export default class Loc extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 / 11, backgroundColor: '#55acee', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'  }}>

                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                                <Image source={{ uri: "https://png.icons8.com/ios/2x/left.png" }} style={{ margin: 5, width: 35, height: 35 }} />
                            </TouchableOpacity>
                        </View>


                    <View style={{ flex: 6 / 8, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: 'white', height: 50, marginTop:8 }}>Bộ lọc tìm kiếm</Text>
                        </View>

                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Basket')}>
                                <Image source={{ uri: "https://png.icons8.com/android/2x/shopping-cart.png" }} style={{ width: 18, height: 18 }} />
                            </TouchableOpacity>
                        </View>
                </View>
                <View style={{ flex: 10 / 11, flexDirection: 'column'}}>
                <ScrollView>
                    <View>
                        <Text style={{ fontSize: 18, color: 'black', marginLeft: 5, margin: 5 }}>Danh mục sản phẩm</Text>
                        </View>
                    <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Điện tử' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin:5 }}>Điện tử</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Thời trang' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Thời trang</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Đồ chơi' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Đời sống</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Đồ chơi</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Du lịch' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Du lịch</Text>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Thể thao' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Thể thao</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Nhà sách' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Nhà sách</Text>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Tạp hóa' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Tạp hóa</Text>
                        </TouchableOpacity>
                    </View>


                    <View>
                        <Text style={{ fontSize: 18, color: 'black', marginLeft: 5, margin: 5 }}>Thiết bị điện tử</Text>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                        <TouchableOpacity style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Máy ảnh</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Điện thoại' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Điện thoại</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Máy tính' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Máy tính </Text>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Ti vi' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Ti vi</Text>
                        </TouchableOpacity>
                    </View>


                    <View>
                        <Text style={{ fontSize: 18, color: 'black', marginLeft: 5, margin: 5 }}>Thời trang</Text>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Thời trang nam' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Thời trang nam</Text>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Thời trang nữ' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Thời trang nữ</Text>
                        </TouchableOpacity>
                    </View>


                    <View>
                        <Text style={{ fontSize: 18, color: 'black', marginLeft: 5, margin: 5 }}>Nhà cửa đời sống</Text>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Tủ hộp' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Tủ, hộp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Trang trí' })}style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Trang trí</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={{ fontSize: 18, color: 'black', marginLeft: 5, margin: 5 }}>Du lịch</Text>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Dụng cụ' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Dụng cụ</Text>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Đồ ăn' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Đồ ăn</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={{ fontSize: 18, color: 'black', marginLeft: 5, margin: 5 }}>Thể thao</Text>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Vợt' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Vợt</Text>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Bóng' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Bóng</Text>
                        </TouchableOpacity>
                    </View>


                    <View>
                        <Text style={{ fontSize: 18, color: 'black', marginLeft: 5, margin: 5 }}>Nhà sách</Text>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Sách giáo khoa' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Sách giáo khoa</Text>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Văn phòng phẩm' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Văn phòng phẩm</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Tiểu thuyết' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Tiểu thuyết</Text>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Giấy' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Giấy</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={{ fontSize: 18, color: 'black', marginLeft: 5, margin: 5 }}>Đồ chơi</Text>
                    </View>
                        <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center'  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Đồ chơi trẻ em' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Đồ chơi trẻ em</Text>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Brand', { search: 'Đồ chơi điện tử' })} style={{ borderRadius: 5, borderColor: 'red', borderWidth: 1, width: width / 2 - 35, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 15, margin: 5 }}>Đồ chơi điện tử</Text>
                        </TouchableOpacity>
                    </View>
                    

                    </ScrollView>
                </View>
            </View>
        );
    }
}