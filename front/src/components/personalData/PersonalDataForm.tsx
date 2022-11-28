import {Header} from "../common/Header";
import {Input} from "../common/Input";
import {Button} from "../common/Button";

import '../common/styles.css'
import {useData} from "../../hooks/useData";
import {Radio} from "../common/Radio";
import {IdentityStatus} from "../../domain/IdentityStatus";

export function PersonalDataForm(props: any)
{   
    const {
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
    } = useData()
    
    return (
        <div id="loginform">

            <Header title="Identification" />
            
            <Input description="Полное имя"
                   placeholder="Полное имя"
                   type="string"
                   isBad={isBadName()}
                   value={fullName}
                   onChange={setFullName}
            />
            
            <Input description="ИНН"
                   placeholder="ИНН"
                   type="string"
                   isBad={isBadInn()}
                   value={inn}
                   onChange={innOnchange}
            />

            <Input description="Телефон"
                   placeholder="Телефон"
                   type="tel"
                   isBad={isBadPhone()}
                   value={phone}
                   onChange={phoneOnchange}
            />
            
            <div className="horizontal-inputs">
                <Input description="Серия паспорта"
                       placeholder="Серия"
                       type="string"
                       isBad={isBadSeries()}
                       value={series}
                       onChange={seriesOnChange}
                />
                <Input description="Номер паспорта"
                       placeholder="Номер"
                       type="string"
                       isBad={isBadNumber()}
                       value={number}
                       onChange={numberOnChange}
                />
            </div>
            
            <div className="horizontal-inputs">
                <Input description="Город"
                       placeholder="Город"
                       type="string"
                       isBad={isBadCity()}
                       value={city}
                       onChange={setCity}
                />
                <Input description="Улица"
                       placeholder="Улица"
                       type="string"
                       isBad={isBadStreet()}
                       value={street}
                       onChange={setStreet}
                />            
                <Input description="Дом"
                       placeholder="Дом"
                       type="string"
                       isBad={isBadHouse()}
                       value={house}
                       onChange={setHouse}
                />
            </div>

            <Input description="Адрес"
                   placeholder="Город"
                   type="string"
                   isDisabled={true}
                   value={city + " " + street + " " + house}
            />

            <div className="horizontal-inputs">
                <Radio description="Директор"
                       placeholder="Должность"
                       value="Director"
                       onChange={onPositionChange}
                />
                <Radio description="Бухгалтер"
                       placeholder="Должность"
                       value="Accountant"
                       onChange={onPositionChange}
                />
                <Radio description="Доверенное лицо"
                       placeholder="Должность"
                       value="TrustedPerson"
                       onChange={onPositionChange}
                />
            </div>
            
            <Button
                color={calcButtonColor()}
                isDisabled={identityStatus == IdentityStatus.Processing}
                title={calcButtonText()}
                onClick={send}
            />
            
        </div>
    )
}