import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: "normal"
        }
    }

    getCameraPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.Camera);
        this.setState({
            hasCameraPermissions: status === "granted"
        });
    }

    handleBarcodeScan = async ({ type, data }) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: "clicked"
        })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === "clicked" && hasCameraPermissions){
            return (
                <BarCodeScanner
                onBarCodeScanned={ scanned ? undefined : this.handleBarcodeScan() }
                />
            );
        } else if(buttonState === "normal"){
            return (
                <View style={{marginTop: 50, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                    style={{width: 50, height: 50}}
                    source={require('../assets/scanner.jpg')} />
                    <Text>
                        {
                            hasCameraPermissions === true
                                ? this.state.scannedData
                                : "Request for Camera Permission"
                        }
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={this.getCameraPermissions()}>
                        <Text style={styles.buttonText}>Scan the Barcode</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        backgroundColor: 'cyan'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold"
    }
});