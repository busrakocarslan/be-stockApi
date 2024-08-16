// ilk 20 dakikayı dinle!!!!!!!!!!
// formik ve yap iki darklı kütürphane kullancağız formaları kotnrol etmek için formik formalar için bizim yazdığımız statet handle fonk oncahance fonk gibi kodları arkadan yapıyor bunlara form handing kğtüphane diyor formik onlardan biri. yap da hatayı algılayıp bize dönüş sağlayan bir kütüphane mui nin helpertext i gibi. 
// logini biz yepacağız register ödev olacak. 
//TODO___FORMİK KÜTÜpHNEDİ
// kolay şekilde react ortamında formların kontrolunu sağlayan bir kütüpjhane alternatifi react hook form bşrbirine çok benziyorlar. İki alternatif kütüphane 
// yarn add formik şeklinde import ediyorsun 
// toplam 4 tane probu var 
//initialvalues,validate,onSubmit ve components diye 4 ayrı probu var. 
//initialvalues=aşağıda kullanılacak inputaların isimleri key value şeklinde {email:"",password:""} gibi veriliyor. veridğimiz isimlerden forbik atka tarafta stateler oluşturuyor. bunları da values diye bir objenin içerisine attığından values. email values. pasword vb şekilde ulaşabiliyoruz. 
//validate || validationscima: validasyon kurallarını vereceğimiz yer harici bir validate kullanıyorusak valitation schema kurallarını veriyoruz. burada proje de yub kullanacağız. 
// onSubmit =>formun elemenlerini submit edildiğinde ne yapılacağına dair callback func oluyorburada fonk iki parametresi var isimler değişebilir ama sırası öenmli values,action şeklinde. action da bir prob bunun içinde onlarca farklı parametre var. setsubmitting,handlechange,errors,handleblur vb...
// conponent probu inputlarda yazdıklarımızı yukarıda component halinde yazıp aşağıda taha temiz yazmamızı sağlıyor ama lkullanmak zorunda değiliz. 
//touched: eror maili yakalamak için 

//TODO-- YUP
// import etmek gerek
//kullanımı kolay pratik bir kğtüphane
//sadece react için değil diğer ortamlarda da kullanılıyor. 
//TODO_RegEX nedir ne iin kullanılır:
//egEx (Regular Expression), metinlerde belirli kalıpları tanımlamak için kullanılan bir dildir. Genellikle metin işleme ve arama işlemlerinde kullanılır. RegEx, belirli bir metin içindeki karakterleri, kelime gruplarını veya desenleri tanımlamak için özel semboller ve karakterlerden oluşan bir dizi kullanır.

//Örneğin, bir RegEx deseni şu şekilde olabilir: /[0-9]+/. Bu desen, metindeki bir veya daha fazla rakamı temsil eder. Yani, "123" gibi bir rakam dizisini eşleştirecektir.
//kurallarını fe kısmına veridldiği gibi be kısmına da verilmeli. aynı validetionlar be tarafındada olmalı. ui tarafından ele geçerilmeler olabilir bu durumda uygulamam zarar görür.
//*isSubmiting 
//action içinde olan  bir boolen değişkendir. bunu kullanabiliyorsun submşit işlemi devam ederken is submiting true oluyor formik yapıyor bunu. mesela onsubmit işlemi devam ederken butonu disable yapacaksan bunu kullanabilirsin.
// onSubmit aşamasında api isteklerini çok yerde yapacağımızdan ayrı bir dıosya oluşturduk genelede servises deniyor. 
// login bir post istediğidir. aycsawait ile yapabiliri. 
//*TOKEN: kişinin token bilgisini güvenli api larda tokensiz işlem yapılmaz toklen i global state e atayıp oradan kullanmalıytız. 
//!api request te çektiğimiz verileri GLOBAL STATE E NASIL AKTARIRIZ
//1- öncelikle slicesimizi oluşturmalıyız nelere globalda ihtiyacımız var onu yazmalıyız. en öenmlisi token bilgisi bu passwordu saklayıp sonraki her işlemimizde bu token ı kullanmalıyız. 
///TODO__ bu workarounda çok öenmli bir hata var dispatch kullanmaya çalışıyoruz o bir costom hook ama biz bu halde normal func kullanıyoruz o yüzden hata alıyoruz. ya comp içinde ya da costom hook içinde kullanmalıyız. bu hatadan kurtulmak için use ile costom hook haline çeviriyoruz!!!
//?costom hook içinde js döndürmeyen ve içinde react hooklarını kullanabileceğin özel bir fonk yapısıdır.bir kere yazarsın her yerde kullanırısın compo gibi. 
//! ------------------------------------------------------------------
//! --------------------------6/5/2024 ikinci gün ---------------------------
//! ------------------------------------------------------------------
//?ilk  ders çok öenmli ayrıntılı not al!!!!!!!!!!!!!!!!
// güvenlikli api larda tokan kullanıldığında logout da normalde token kullanılıyor bizde öyle yaptık.

//*ikinci ders logout yöntemi
// güvenlikli apilarda token isteği muıtlaka kullanılır be bize burada logout u get isteği olarak ayarlamış ancak normalde post isteği olur ve token gerekir bu yüzden ona göre ayarladık. 


// sürekli get post işlememi yapmamk için her işlemde de şifre işlmeleri uzun süreceğinden 
//"5807ebba34d21ced65a0d991e0a5ce71f18cff2adb65d2aec9752525fad1c338
//!axios İNsTaNCE 
// axiosu kullanmamızı basitleştiren bir yöntem servise klasörünün altında yeni bir file açıp 
// const instance=axios.create({baseUrl:"",timeout:"",headers:""}) şeklinde bir yapı bu get post gibi bir işlem değil axiosun içinde oln bir yöntem instance bu bize bütün configleri(çalışma hali) verilmiş bir instance veriyor, adına instance dışında da bir şey verilebilir.bunu ör şöyle çağoralacak instance.get instance.post gibi sadece devamındaki endpoint eklenecek
//! ------------------------------------------------------------------
//! --------------------------9/5/2024 üçüncü gün ---------------------------
//! ------------------------------------------------------------------
//* yazacağımız getfirms fonksiyonuna diğer yerlerde de ihtiyacımız olduğu için globalde tanımladık, componentin dışında tanımlayarak export etsek de içerisinde hook kullanmamız gerektiğinden hooklar içinde ya comp ya da hook grektiğinden globalde costom hook helinde yazmak en doğrusu.
//Api den gelen tüm bilgileri global state de slice dosyasında initinial state dosyasında boş array olarak aldık.
// oluşturacağımız slice da her bir parametremiz için ayrı ayrı fonc yazmak yerine tek fonk ile yazıp kod kalabalığından kurtulmak işstedik. 
//  öncelikle stockrequeste fonksiyonumuzu get stock olarak teke indşirdik. pat bilgisini parametre olarak verdik fonksiyona.Birde dispatchden çağırdığımız fonk farklılığı vardı, onu da düzenledik.
// dispatch de olan farklılık da state in adı idi. Stock quaride parametrik olarak gönderdiğimiz path bilgisini slace a atayarak onu da paraöeterik hale getirmiş olduk. 
//*Maping yönteminden bahsetti şu gelirse bu anla diye atama yapmak aslında  bilgiyi aşağoıya ekledimn
// "Mapleme" terimi, yazılım geliştirme sürecinde kullanılan bir terimdir ve genellikle bir problem alanını veya bir işlevi başka bir alana veya işlevsel bir yapıya dönüştürme sürecini ifade eder. Genellikle bu, bir veri yapısının bir başka veri yapısına dönüştürülmesini veya bir algoritmanın bir başka algoritmaya dönüştürülmesini içerir.

// Mapleme genellikle bir şeyin bir başka şeye dönüştürülmesi olarak düşünülebilir. Örneğin, bir veri modelinin bir başka veri modeline dönüştürülmesi, bir işlevin bir başka işlevsel yapıya dönüştürülmesi veya bir algoritmanın bir başka algoritmayla değiştirilmesi gibi durumlar mapleme kavramına örnektir.

// Mapleme aynı zamanda veri dönüştürme, veri eşlemesi veya fonksiyonel dönüşüm gibi terimlerle de ilişkilendirilebilir. Bu kavramlar, bir veri veya işlevin başka bir formata veya yapıya dönüştürülmesini ifade ederken kullanılır. Bu, yazılım geliştirme sürecinde kodun optimize edilmesi, daha iyi performans elde edilmesi veya daha temiz ve okunabilir kod oluşturulması için sıkça kullanılan bir tekniktir.
//TODO_DELETE kımsı
// deletestock adında fonksiyonuzu yine parametreli yazıyoruz çünkü her yerde aynı işelmei yapsın diye silme işşlemi olduğu için delete yazmak zorunlu data dan gelen id bilgisini de vermek zorundayız parametrede,.
// delete işlemini yaptıktan sonra yeniden get işlmei yapıyoruz silinen olmadan güncellenmiş hali geliyor.
// he rsaferinde refresh yapınca bizi atmaması için : indexedDb veri tabanına benziyor daha büyük alanlar saklanabiliyor.kullanımı komplex ama alanı büyük. ama çok büyük veri saklayacaksak bunu be tarafında saklamalıyız. girdiğimiz cihaza göre local veriler değişebileceği için öreneğin hem cep telefonundan hem de pc de girdiğimizde spetette ürünleri görtemek için be de saklanıyor local de saklasan cihaz değişince bulamayız o yüzden BE de saklamak gerek.
//* burada useri sakalyacağız bunun için hazır 3part kütüphaneler var redux-persist ara yazılım miidlewire gibi.defauşt hali local ,sessiona atamak için özellikle yazmak gerek .bunu store alanına ekliyoruz. 
//TODO __product kısmı
//* muı X nin data gird adında bir tablo yapısı var daha özellikli oluşturulmuşalt kütüphane gibi yarn add ile kurmak gerekiyor
//! ------------------------------------------------------------------
//! --------------------------13/5/2024 beşinci gün ---------------------------
//! ------------------------------------------------------------------

//* MUi nin alert isminde bir komponneti bulunmakltadır.İcon konulabiliyor ve alertim türüne göre renkde değiştirilebiliyır.  içi dolu boş yapabiliyorsun. 
//?Loading için de skelaton yapısı var mui nin 
//! KPI lar bir uygulamada kritip verileri gösteren kartlardır
//?PROMİSE ALLL yapısı 
// içerisinde attığımız isteklerin her birini aynı anda yapar biri hata dönerse tamamını hatayla dönderir. birden çok isteğe aynı anda ihtiyacımız olduğunda kullanılabilecek bir yapı.Birleştirici olarak kabul eder. isteklerini array olarak atıyorsun sonuçlarda array olarak geliyor. ardışık veriler yoksa bireysel atılabilir;ancak birbirine bağlı veriler varsa promiseall kullanılabilir. 
//* bazı serverlar eşzamanlı istek sayısı çok olursa bunu saldırı zannedip ploklayabilşyor imiş, dikkat et.
// reachats,goJs grafik çşzmek şçşn olan kütüphaneler






// const getProPurBraFirmStock = async () => {
//     dispatch(fetchStart())
//     try {
//       const [pro, pur, bra, fir] = await Promise.all([
//         axiosToken("/products"),
//         axiosToken("/purchases"),
//         axiosToken("/brands"),
//         axiosToken("/firms"),
//       ])
//       const products = pro?.data?.data
//       const purchases = pur?.data?.data
//       const brands = bra?.data?.data
//       const firms = fir?.data?.data

//       dispatch(getProPurBraFirmSuccess({ products, purchases, brands, firms }))
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   getProPurBraFirmSuccess: (
//     state,
//     { payload: { products, purchases, firms, brands } }
//   ) => {
//     state.loading = false
//     state.products = products
//     state.purchases = purchases
//     state.brands = brands
//     state.firms = firms
//   },













// store ile alakalı dersin sonundaki bilgileri yaz!!!!!