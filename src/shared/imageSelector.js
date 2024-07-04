import GermanyFlag from "../assets/images/flags/germany-sq.png";
import FranceFlag from "../assets/images/flags/french-sq.png";
import SpainFlag from "../assets/images/flags/spain-sq.png";
import ItalyFlag from "../assets/images/flags/italy-sq.png";

export function FlagSelector(flagName){
    if(flagName === 'germany')
        return GermanyFlag;
    if(flagName === 'france')
        return FranceFlag;
    if(flagName === 'spain')
        return SpainFlag;
    if(flagName === 'italy')
        return ItalyFlag;
}