package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class ProductcategoryData extends AbstractSeedClass {

    public ProductcategoryData(){
        addIdNameData(1, "Flour");
        addIdNameData(2, "Essance");
        addIdNameData(3, "Sugar");
        addIdNameData(4, "Gelatin");
        addIdNameData(5, "Other");
    }

}
