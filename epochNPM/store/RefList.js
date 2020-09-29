
function RefNode(refId, component, ref, tag) {
  this.epochRefId = refId;
  this.component = component;
  this.next = null;
  this.ref = ref
  this.epochRefTag = tag;
};

function EpochRefList() {
  let nextId = 1;
  this.head = null;
  this.tail = null;
  this.circularReference = new Set();
  
  Object.defineProperties(this, {
    nextRefId : {
      get() {return nextId},
      set(x) {nextId = nextId += 1}
    }
  })
};

EpochRefList.prototype.addRef = function(component, ref, refId, tag) {
  if(this.circularReference.has(ref)) {
    console.log('Ref ALREADY IN LIST -> ', ref);
    return ref;
  }
  
  const newRefNode = new RefNode(refId, component, ref, tag);
  console.log('ADDING REF TO LIST -> ', newRefNode)
  console.log('Head Node -> ', this.head);
  if(!this.head) {
    console.log('Adding head Node');
    this.head = newRefNode;
    this.tail = this.head;
    this.circularReference.add(ref);
    return newRefNode
  }
  console.log('Adding to End of list');
  this.tail.next = newRefNode;
  this.tail = newRefNode;
  this.circularReference.add(ref);
  return newRefNode;
}

EpochRefList.prototype.claimRefId = function() {
  const refId = this.nextRefId;
  this.nextRefId += 1;
  return refId
}

export default EpochRefList;