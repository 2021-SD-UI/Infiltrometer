//contains the single reference to the soil types to be used in reports under key "soilType"
export const soilTypes = {
     clay: {
          nh0: 1.09,
          /* positive number, of n/h0*/
          alpha: 0.008 /* positive number,*/
     },
     clayLoam: {
          nh0: 1.31,
          /* positive number, of n/h0*/
          alpha: 0.019 /* positive number,*/
     },
     loam: {
          nh0: 1.56,
          /* positive number, of n/h0*/
          alpha: .036 /* positive number,*/
     },
     sand: {
          alpha: 0.145,
          nh0: 2.68
     },
     sandyClay: {
          alpha: 0.027,
          nh0: 1.23
     },
     loamySand: {
          alpha: 0.124,
          nh0: 2.28
     },
     sandyClayLoam: {
          alpha: .059,
          nh0: 1.48
     },
     sandyLoam: {
          alpha: 0.075,
          nh0: 1.89
     },
     silt: {
          alpha: 0.016,
          nh0: 1.37
     },
     siltLoam: {
          alpha: .02,
          nh0: 1.41
     },
     siltyClay: {
          alpha: 0.005,
          nh0: 1.09
     },
     siltyClayLoam: {
          alpha: 0.01,
          nh0: 1.23
     },
     undefined: {
          alpha: null,
          nh0: null
     }
}