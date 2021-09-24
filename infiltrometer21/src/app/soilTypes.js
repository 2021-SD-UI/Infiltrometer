//contains the single reference to the soil types to be used in reports under key "soilType"
export const soilTypes = {
    clay: {nh0:1,
         /* positive number, of n/h0*/ 
         alpha: 1 /* positive number,*/},
    clayLoam:  {
        nh0:2,
         /* positive number, of n/h0*/ 
         alpha: 2 /* positive number,*/},
    loam:  {nh0:3,
         /* positive number, of n/h0*/ 
         alpha: 3 /* positive number,*/},
    default: {
        nh0:4,
         /* positive number, of n/h0*/ 
         alpha: 4 /* positive number,*/
    }
}