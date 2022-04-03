enum RadioMessage {
    message1 = 49434,
    passed10 = 35537
}
radio.onReceivedNumber(function (receivedNumber) {
    radio2 = receivedNumber
})
function pathA1B1 () {
    while (false) {
    	
    }
}
function walkStright () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 70)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
    } else {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 50)
    }
}
input.onButtonPressed(Button.A, function () {
    OLED.clear()
    if (pickupDestination == 0) {
        OLED.writeStringNewLine("[Pickup Destination]")
        if (pickupDestinationList[selectingPickupDestination - 1]) {
            OLED.writeString("< ")
        }
        OLED.writeString("A" + convertToText(pickupDestinationList[selectingPickupDestination]))
        if (pickupDestinationList[selectingPickupDestination + 1]) {
            OLED.writeString(" >")
        }
    } else if (deliveryDestination == 0) {
        OLED.writeStringNewLine("[Pickup Destination]: A" + convertToText(pickupDestination))
        OLED.writeStringNewLine("[Delivery Destination]")
        if (deliveryDestinationList[selectingDeliveryDestination - 1]) {
            OLED.writeString("< ")
        }
        OLED.writeString("B" + convertToText(deliveryDestinationList[selectingDeliveryDestination]))
        if (deliveryDestinationList[selectingDeliveryDestination + 1]) {
            OLED.writeString(" >")
        }
    }
})
function promptDestination () {
    OLED.writeStringNewLine("[Pickup Destination]: A" + convertToText(pickupDestination))
    selectingDeliveryDestination = 0
    OLED.writeStringNewLine("[Delivery Destination]")
    OLED.writeString("B" + convertToText(deliveryDestinationList[selectingDeliveryDestination]))
    OLED.writeString(" >")
    while (deliveryDestination == 0) {
        if (input.buttonIsPressed(Button.B)) {
            deliveryDestination = deliveryDestinationList[selectingDeliveryDestination]
            radio.sendValue("drop", deliveryDestinationList[selectingDeliveryDestination])
            break;
        } else if (input.buttonIsPressed(Button.A)) {
            if (deliveryDestinationList[selectingDeliveryDestination + 1]) {
                selectingDeliveryDestination = selectingDeliveryDestination + 1
                basic.pause(500)
            } else {
                selectingDeliveryDestination = 0
                basic.pause(500)
            }
        }
    }
    OLED.clear()
}
function pathBuilding1 () {
	
}
function promptPickup () {
    selectingPickupDestination = 0
    OLED.writeStringNewLine("[Pickup Destination]")
    OLED.writeString("A" + pickupDestinationList[selectingPickupDestination])
    OLED.writeString(" >")
    while (pickupDestination == 0) {
        if (input.buttonIsPressed(Button.B)) {
            pickupDestination = pickupDestinationList[selectingPickupDestination]
            radio.sendValue("pickup", pickupDestinationList[selectingPickupDestination])
            break;
        } else if (input.buttonIsPressed(Button.A)) {
            if (pickupDestinationList[selectingPickupDestination + 1]) {
                selectingPickupDestination = selectingPickupDestination + 1
                basic.pause(500)
            } else {
                selectingPickupDestination = 0
                basic.pause(500)
            }
        }
    }
    OLED.clear()
}
let delivered = 0
let selectingDeliveryDestination = 0
let selectingPickupDestination = 0
let deliveryDestination = 0
let pickupDestination = 0
let radio2 = 0
let deliveryDestinationList: number[] = []
let pickupDestinationList: number[] = []
maqueen.motorStop(maqueen.Motors.All)
OLED.init(128, 64)
pickupDestinationList = [1, 2]
deliveryDestinationList = [1, 2, 3]
radio.setGroup(10)
basic.forever(function () {
    delivered = 0
    promptPickup()
    promptDestination()
    basic.pause(2000)
    music.playTone(262, music.beat(BeatFraction.Whole))
    if (pickupDestination == 1) {
        if (deliveryDestination == 1) {
            music.playTone(392, music.beat(BeatFraction.Whole))
            while (radio2 != 10) {
                walkStright()
                basic.pause(5)
            }
            radio2 = 0
            maqueen.motorStop(maqueen.Motors.All)
            music.playTone(659, music.beat(BeatFraction.Whole))
            basic.showIcon(IconNames.TShirt)
            radio.sendNumber(1)
            while (radio2 != 12) {
                walkStright()
                basic.pause(5)
            }
            radio2 = 0
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 25)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            basic.pause(1000)
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
            basic.pause(200)
            while (radio2 != 13) {
                walkStright()
                basic.pause(5)
            }
            radio2 = 0
            maqueen.motorStop(maqueen.Motors.All)
            basic.clearScreen()
            music.playTone(659, music.beat(BeatFraction.Whole))
            radio.sendNumber(1)
        } else if (deliveryDestination == 2) {
            while (radio2 != 10) {
                walkStright()
                basic.pause(5)
            }
            radio2 = 0
            maqueen.motorStop(maqueen.Motors.All)
            music.playTone(659, music.beat(BeatFraction.Whole))
            basic.showIcon(IconNames.TShirt)
            radio.sendNumber(1)
            while (radio2 != 12) {
                walkStright()
                basic.pause(5)
            }
            radio2 = 0
            maqueen.motorStop(maqueen.Motors.All)
            deliveryDestination = 0
            pickupDestination = 0
            promptPickup()
            promptDestination()
        }
    }
})
