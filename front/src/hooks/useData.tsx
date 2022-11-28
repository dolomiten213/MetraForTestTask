import {useEffect, useState} from "react";
import axios from "axios";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr"
import {IdentityStatus} from "../domain/IdentityStatus";


export function useData()
{
    const [inn, setInn] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [series, setSeries] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [house, setHouse] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [hubConnection, setHubConnection] = useState<HubConnection>();
    const [identityStatus, setIdentityStatus] = useState<IdentityStatus>(IdentityStatus.NotRequired);
    
    useEffect(() =>
    {
        if (hubConnection) return;
        createHubConnection();
    })

    
    const createHubConnection = async () =>
    {
        const _hubConnection = new HubConnectionBuilder().withUrl("http://localhost/identity").build()
        
        _hubConnection.on("ReceiveMessage", (user, message) => {
            // console.log(user)
            // console.log(message)
            setIdentityStatus(user ? IdentityStatus.Ok : IdentityStatus.Error)
        })
        _hubConnection.onclose(() => alert("server is offline"));
        
        try {
            await _hubConnection.start()
            setHubConnection(_hubConnection)
        }
        catch {
            alert("server is offline")
            setHubConnection(undefined)
        }
    }
    
    function innOnchange(newValue: any) {
        let reg = new RegExp("^\\d*$")
        if (reg.test(newValue) && newValue.length <= 12)
        {
            setInn(newValue)
        }
    }

    const isBadText = (str: string) => str === ""
    const isBadName = () => isBadText(fullName)
    const isBadCity = () => isBadText(city)
    const isBadStreet = () => isBadText(street)
    const isBadHouse = () => isBadText(house)

    
    const isBadInn = () =>
    {
        let reg10 = new RegExp("^\\d{10}$")
        let reg12 = new RegExp("^\\d{12}$")
        return !(reg10.test(inn) || reg12.test(inn));
    }
    
//==============================================================//
    
    function phoneOnchange(newValue: any) {
        let reg = new RegExp("^\\+?\\d*$")
        if (reg.test(newValue) && newValue.length <= 12)
        {
            setPhone(newValue)
        }
    }
    
    const isBadPhone = () =>
    {
        let reg = new RegExp("^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$")
        // console.log(!reg.test(phone))
        return !reg.test(phone)
    }
    
//==============================================================//

    function seriesOnChange(newValue: any) {
        let reg = new RegExp("^\\d*$")
        console.log(newValue)
        if (reg.test(newValue) && newValue.length <= 4)
        {
            setSeries(newValue)
        }
    }

    const isBadSeries = () =>
    {
        let reg = new RegExp("^[0-9]{4}$")
        return !reg.test(series)
    }

    function numberOnChange(newValue: any) {
        let reg = new RegExp("^\\d*$")
        console.log(newValue)
        if (reg.test(newValue) && newValue.length <= 6)
        {
            setNumber(newValue)
        }
    }

    const isBadNumber = () =>
    {
        let reg = new RegExp("^[0-9]{6}$")
        return !reg.test(number)
    }


//==============================================================//

    function onPositionChange(newValue: any) {
        console.log(newValue)
        setPosition(newValue)
    }
    
//==============================================================//

    async function send()
    {
        let token = localStorage.getItem('token')
        const headers = {
            'Authorization': 'bearer ' + token
        }
        try {
            let res = await axios.post("http://localhost/api/identify", {
                name: fullName,
                inn: inn,
                phone: phone,
                series: series,
                number: number,
                city: city, 
                street: street,
                house: house,
                position: position
            }, {headers: headers})
            setIdentityStatus(IdentityStatus.Processing)
        }
        catch
        {
            alert('server is offline')
        }
    }
    
    
    function calcButtonColor(): string {
        switch (identityStatus)
        {
            case IdentityStatus.NotRequired: return "row";
            case IdentityStatus.Processing: return "row yellow";
            case IdentityStatus.Error: return "row red";
            case IdentityStatus.Ok: return "row green";
        }
    }

    function calcButtonText(): string {
        switch (identityStatus)
        {
            case IdentityStatus.NotRequired: return "Identify";
            case IdentityStatus.Processing: return "Processing";
            case IdentityStatus.Error: return "Error";
            case IdentityStatus.Ok: return "Ok";
        }
    }
    return {
        inn, innOnchange, isBadInn,
        fullName, setFullName, isBadName,
        phone, phoneOnchange, isBadPhone,
        series, seriesOnChange, isBadSeries,
        number, numberOnChange, isBadNumber,
        city, setCity, isBadCity,
        street, setStreet, isBadStreet,
        house, setHouse,isBadHouse,
        position, onPositionChange,
        identityStatus, setIdentityStatus,
        send, calcButtonColor, calcButtonText
    }
}

