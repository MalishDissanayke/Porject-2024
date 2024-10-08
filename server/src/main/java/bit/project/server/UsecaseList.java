package bit.project.server;

import bit.project.server.util.security.SystemModule;

public enum UsecaseList{
    @SystemModule("User") SHOW_ALL_USERS(1),
    @SystemModule("User") SHOW_USER_DETAILS(2),
    @SystemModule("User") ADD_USER(3),
    @SystemModule("User") UPDATE_USER(4),
    @SystemModule("User") DELETE_USER(5),
    @SystemModule("User") RESET_USER_PASSWORDS(6),
    @SystemModule("Role") SHOW_ALL_ROLES(7),
    @SystemModule("Role") SHOW_ROLE_DETAILS(8),
    @SystemModule("Role") ADD_ROLE(9),
    @SystemModule("Role") UPDATE_ROLE(10),
    @SystemModule("Role") DELETE_ROLE(11),
    @SystemModule("Employee") SHOW_ALL_EMPLOYEES(12),
    @SystemModule("Employee") SHOW_EMPLOYEE_DETAILS(13),
    @SystemModule("Employee") ADD_EMPLOYEE(14),
    @SystemModule("Employee") UPDATE_EMPLOYEE(15),
    @SystemModule("Employee") DELETE_EMPLOYEE(16),
    @SystemModule("Client") SHOW_ALL_CLIENTS(17),
    @SystemModule("Client") SHOW_CLIENT_DETAILS(18),
    @SystemModule("Client") ADD_CLIENT(19),
    @SystemModule("Client") UPDATE_CLIENT(20),
    @SystemModule("Client") DELETE_CLIENT(21),
    @SystemModule("Route") SHOW_ALL_ROUTES(22),
    @SystemModule("Route") SHOW_ROUTE_DETAILS(23),
    @SystemModule("Route") ADD_ROUTE(24),
    @SystemModule("Route") UPDATE_ROUTE(25),
    @SystemModule("Route") DELETE_ROUTE(26),
    @SystemModule("Vehicle") SHOW_ALL_VEHICLES(27),
    @SystemModule("Vehicle") SHOW_VEHICLE_DETAILS(28),
    @SystemModule("Vehicle") ADD_VEHICLE(29),
    @SystemModule("Vehicle") UPDATE_VEHICLE(30),
    @SystemModule("Vehicle") DELETE_VEHICLE(31),
    @SystemModule("Supplier") SHOW_ALL_SUPPLIERS(32),
    @SystemModule("Supplier") SHOW_SUPPLIER_DETAILS(33),
    @SystemModule("Supplier") ADD_SUPPLIER(34),
    @SystemModule("Supplier") UPDATE_SUPPLIER(35),
    @SystemModule("Supplier") DELETE_SUPPLIER(36),
    @SystemModule("Materialdisposal") SHOW_ALL_MATERIALDISPOSALS(37),
    @SystemModule("Materialdisposal") SHOW_MATERIALDISPOSAL_DETAILS(38),
    @SystemModule("Materialdisposal") ADD_MATERIALDISPOSAL(39),
    @SystemModule("Materialdisposal") UPDATE_MATERIALDISPOSAL(40),
    @SystemModule("Materialdisposal") DELETE_MATERIALDISPOSAL(41),
    @SystemModule("Porder") SHOW_ALL_PORDERS(42),
    @SystemModule("Porder") SHOW_PORDER_DETAILS(43),
    @SystemModule("Porder") ADD_PORDER(44),
    @SystemModule("Porder") UPDATE_PORDER(45),
    @SystemModule("Porder") DELETE_PORDER(46),
    @SystemModule("Purchase") SHOW_ALL_PURCHASES(47),
    @SystemModule("Purchase") SHOW_PURCHASE_DETAILS(48),
    @SystemModule("Purchase") ADD_PURCHASE(49),
    @SystemModule("Purchase") UPDATE_PURCHASE(50),
    @SystemModule("Purchase") DELETE_PURCHASE(51),
    @SystemModule("Supplierpayment") SHOW_ALL_SUPPLIERPAYMENTS(52),
    @SystemModule("Supplierpayment") SHOW_SUPPLIERPAYMENT_DETAILS(53),
    @SystemModule("Supplierpayment") ADD_SUPPLIERPAYMENT(54),
    @SystemModule("Supplierpayment") UPDATE_SUPPLIERPAYMENT(55),
    @SystemModule("Supplierpayment") DELETE_SUPPLIERPAYMENT(56),
    @SystemModule("Material") SHOW_ALL_MATERIALS(57),
    @SystemModule("Material") SHOW_MATERIAL_DETAILS(58),
    @SystemModule("Material") ADD_MATERIAL(59),
    @SystemModule("Material") UPDATE_MATERIAL(60),
    @SystemModule("Material") DELETE_MATERIAL(61),
    @SystemModule("Product") SHOW_ALL_PRODUCTS(62),
    @SystemModule("Product") SHOW_PRODUCT_DETAILS(63),
    @SystemModule("Product") ADD_PRODUCT(64),
    @SystemModule("Product") UPDATE_PRODUCT(65),
    @SystemModule("Product") DELETE_PRODUCT(66),
    @SystemModule("Product") ADD_PRODUCT_INVENTORY(67),
    @SystemModule("Product") ADD_PRODUCT_ORDER(68),
    @SystemModule("Product") SHOW_YEAR_WISE_EMPLOYEE_COUNT(69),
    @SystemModule("Product") SHOW_MATERIAL_QUANTITIES(70),
    @SystemModule("Order") SHOW_ALL_ORDERS(71),
    @SystemModule("Order") SHOW_ORDER_DETAILS(72),
    @SystemModule("Order") ADD_ORDER(73),
    @SystemModule("Order") UPDATE_ORDER(74),
    @SystemModule("Order") DELETE_ORDER(75);

    public final int value;

    UsecaseList(int value){
        this.value = value;
    }

}
