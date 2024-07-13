package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class ProducttypeData extends AbstractSeedClass {

    public ProducttypeData(){
        addIdNameData(1, "Sanitary");
        addIdNameData(2, "Cleaning");
        addIdNameData(3, "Medical");
        addIdNameData(4, "High end cleaning");
        addIdNameData(5, "Other");
    }

}
