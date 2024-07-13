package bit.project.server.seed;

import java.util.Hashtable;
import bit.project.server.util.seed.SeedClass;
import bit.project.server.util.seed.AbstractSeedClass;

@SeedClass
public class MaterialtypeData extends AbstractSeedClass {

    public MaterialtypeData(){
        addIdNameData(1, "Iron");
        addIdNameData(2, "Chemicals");
        addIdNameData(3, "Steel");
        addIdNameData(4, "Adhesive");
        addIdNameData(5, "Other");
    }

}
