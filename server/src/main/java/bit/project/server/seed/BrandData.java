package bit.project.server.seed;

import java.util.Hashtable;
import bit.project.server.util.seed.SeedClass;
import bit.project.server.util.seed.AbstractSeedClass;

@SeedClass
public class BrandData extends AbstractSeedClass {

    public BrandData(){
        addIdNameData(1, "BASF");
        addIdNameData(2, "Dow");
        addIdNameData(3, "LyondellBasell");
        addIdNameData(4, "Sumitomo Chemical");
        addIdNameData(5, "Air Liquide");
        addIdNameData(6, "ExxonMobil");
        addIdNameData(7, "Lanka");
        addIdNameData(8, "LG Chem");
        addIdNameData(9, "Linde");
        addIdNameData(10, "Other Brand");
    }

}
