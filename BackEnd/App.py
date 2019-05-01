import requests
import json


def reveiverFunctionalities():
    print("===========================================")
    print("0.EXIT")
    print("1.NEW RECEIVER")
    print("2.OLD RECEIVER")
    receiverChoice = input("Enter your choice   :")
    if receiverChoice == 0:
        return
    if receiverChoice == 1:
        type=raw_input("Enter the type of blood you want    :")
        quantity=raw_input("Enter quantity of blood you want    :");
        url="http://localhost:3000/api/receiver/getblood/"+str(type)+"/"+str(quantity)
        data=requests.get(url)
        data = data.json()
        if len(data) == 0:
            print("We are extremely sorry we can't satisfy your requirement.")
        else:
            print("Congrats we can satisfy your requirement")
            receiver_name=raw_input("Enter Receivers Name   :")
            receiver_address=raw_input("Enter Receivers address :")
            age=raw_input("Enter Receivers Age  :")
            sex=raw_input("Enter Receivers Gender   :")
            number1=raw_input("Enter Emergency Contact Number1   :")
            number2=raw_input("Enter Emergency Contact Number2  :")

            dataToBePosted={}
            dataToBePosted["receiver_name"]=receiver_name
            dataToBePosted["receiver_address"]=receiver_address
            dataToBePosted["blood_group"]=type
            dataToBePosted["age"]=age
            dataToBePosted["sex"]=sex
            dataToBePosted["bank_code"]=1
            dataToBePosted["quantity"]=quantity
            dataToBePosted["number"]=number1
            dataToBePosted["number1"]=number2
            data=requests.post("http://localhost:3000/api/receiver/fulfill",dataToBePosted)
            data = data.json()
            if len(data)==0:
                print("Opps something went wrong")
            else:
                print(data[0]["message"])
    if receiverChoice == 2:
        type = raw_input("Enter the type of blood you want    :")
        quantity = raw_input("Enter quantity of blood you want    :");
        url = "http://localhost:3000/api/receiver/getblood/" + str(type) + "/" + str(quantity)
        data = requests.get(url)
        data = data.json()
        if len(data) == 0:
            print("We are extremely sorry we can't satisfy your requirement.")
        else:
            print("Congrats we can satisfy your requirement")
            receiverID=input("ENTER RECEIVER ID :")
            url="http://localhost:3000/api/receiver/history/"+str(receiverID)
            data=requests.get(url)
            data = data.json()
            if len(data)==0:
                print("RECEIVER WITH GIVEN ID DOES NOT EXIST")
            else:
                url="http://localhost:3000/api/receiver/fulfill/"+str(receiverID)+"/"+str(type)+"/"+str(quantity)
                data=requests.post(url)
                data=data.json()
                if len(data)==0:
                    print("Sorry you can not get the blood on same day.Please visit again")
                else:
                    print(data[0]["message"])


def donarFunctionalities():
    print("===========================================")
    print("0.EXIT")
    print("1.NEW DONAR")
    print("2.OLD DONAR")
    donarChoice = input("Enter your choice  :")
    if donarChoice == 0:
        return
    if donarChoice == 1:
        print("NEW DONAR")
    if donarChoice == 2:
        print("OLD DONAR")


def bankFunctinalities():
    print("===========================================")
    print("0.EXIT")
    print("1.GET BANK STATUS")
    bankChoice = input("Enter your choice   :")
    if bankChoice == 0:
        return
    if bankChoice == 1:
        bankID=input("Enter bank ID :")
        url="http://localhost:3000/api/bloodbank/report/"+str(bankID)
        data=requests.get(url)
        data=data.json()
        if len(data)==0:
            print("Bank with given ID does not exist")
        else:
            print(json.dumps(data, indent=2, sort_keys=True))


def inventoryFunctionalities():
    print("===========================================")
    print("0.EXIT")
    print("1.GET INVENTORY STORAGE STATUS")
    print("2.TRANSFER BLOOD FROM BLOOD CAMP")
    invChoice = input("Enter your choice    :")
    if invChoice == 0:
        return
    if invChoice == 1:
        inventory_id=input("ENTER THE INVENTORY ID  :")
        url="http://localhost:3000/api/bloodinventory/report/"+str(inventory_id)
        data=requests.get(url)
        data=data.json()
        if len(data)==0:
            print("Inventory with given ID does not exist...Please Enter correct Inventory ID")
        else:
            print(json.dumps(data, indent=2, sort_keys=True))
    if invChoice == 2:
        inventory_id=input("ENTER THE INVENTORY ID IN WHICH YOU WANT TO TRANSFER BLOOD  :")
        camp_id=input("ENTER THE CAMP ID FROM WHERE YOU WANT TO TRANSFER BLOOD  :")
        url="http://localhost:3000/api/bloodinventory/transfer/"+str(inventory_id)+"/"+str(camp_id);
        data=requests.post(url)
        data=data.json()
        print(data[0]["message"])


def  getChoice():
    print("===========================================")
    print("0.EXIT")
    print("1.RECEIVER")
    print("2.DONAR")
    print("3.BANK")
    print("4.INVENTORY")
    choice=input("ENTER YOUR CHOICE :")
    return choice;


if __name__ == '__main__':
    while True:
        choice = getChoice()
        if choice==0:
            break

         # RECEIVER PART
        if choice==1:
            reveiverFunctionalities()

        # DONAR PART
        if choice==2:
            donarFunctionalities()

        # BANK PART
        if choice==3:
            bankFunctinalities()

        # INVENTORY PART
        if choice==4:
            inventoryFunctionalities()
